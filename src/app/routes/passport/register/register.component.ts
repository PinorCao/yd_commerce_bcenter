import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';

import {
    AccountServiceProxy,
    UserLoginInfoDto,
    TokenAuthServiceProxy, AuthenticateModel, IAuthenticateModel, SMSServiceProxy, CodeSendInput
} from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'passport-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
    form: FormGroup;
    error = '';
    type = 0;
    visible = false;
    status = 'pool';
    progress = 0;
    passwordProgressMap = {
        ok: 'success',
        pass: 'normal',
        pool: 'exception',
    };

    constructor(
        fb: FormBuilder,
        private router: Router,
        public http: _HttpClient,
        public msg: NzMessageService,
        private accountSvc: AccountServiceProxy,
        private tokenSvc: TokenAuthServiceProxy,
        private smsSvc: SMSServiceProxy
    ) {
        this.form = fb.group({
            name: [null, [Validators.required, Validators.min(2)]],
            phoneNumber: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            emailAddress: [null, [Validators.required, Validators.email]],
            type: [1, [Validators.required, Validators]],
            password: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.checkPassword.bind(this),
                ],
            ],
            confirm: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.passwordEquar,
                ],
            ],
            mobilePrefix: [1],
            registerCode: [null, [Validators.required]],
        });
    }

    static checkPassword(control: FormControl) {
        if (!control) return null;
        const self: any = this;
        self.visible = !!control.value;
        if (control.value && control.value.length > 9) {
            self.status = 'ok';
        } else if (control.value && control.value.length > 5) {
            self.status = 'pass';
        } else {
            self.status = 'pool';
        }

        if (self.visible) {
            self.progress =
                control.value.length * 10 > 100 ? 100 : control.value.length * 10;
        }
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) {
            return null;
        }
        if (control.value !== control.parent.get('password').value) {
            return {equar: true};
        }
        return null;
    }

    // #region fields

    get name() {
        return this.form.controls.name;
    }

    get password() {
        return this.form.controls.password;
    }

    get confirm() {
        return this.form.controls.confirm;
    }

    get phoneNumber() {
        return this.form.controls.phoneNumber;
    }

    get registerCode() {
        return this.form.controls.registerCode;
    }

    // #endregion

    // #region get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        if (this.phoneNumber.invalid) {
            this.phoneNumber.markAsDirty({onlySelf: true});
            this.phoneNumber.updateValueAndValidity({onlySelf: true});
            return;
        }

        const data = new CodeSendInput({
            targetNumber: this.phoneNumber.value,
            codeType: 10,
            captchaResponse: ''
        });

        this.smsSvc.sendCode(data).subscribe(res => {
            if (res.success) {
                this.count = 59;
                this.interval$ = setInterval(() => {
                    this.count -= 1;
                    if (this.count <= 0) clearInterval(this.interval$);
                }, 1000);
            }
        });
    }

    // #endregion

    submit() {
        this.error = '';
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        if (this.form.invalid) {
            return;
        }

        this.accountSvc.register(this.form.value).subscribe(res => {
            if (res.canLogin) {
                const data = new AuthenticateModel({
                    loginCertificate: this.form.get('name').value,
                    password: res.randomPassword
                });
                this.tokenSvc.authenticate(data).subscribe(res => {
                    console.log(res);
                    /*this.router.navigateByUrl('/passport/register-result', {
                        queryParams: {email: data.loginCertificate},
                    });*/
                })
            } else {
                this.router.navigate(['/passport/login'])
            }
        })
        /*this.http.post('/register', data).subscribe(() => {
            this.router.navigateByUrl('/passport/register-result', {
                queryParams: {email: data.mail},
            });
        });*/
    }

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
