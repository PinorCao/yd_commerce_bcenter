import {SettingsService, _HttpClient} from '@delon/theme';
import {Component, OnDestroy, Inject, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  ITokenService,
  DA_SERVICE_TOKEN
} from '@delon/auth';
import {ReuseTabService} from '@delon/abc';
import {environment} from '@env/environment';
import {StartupService} from '@core';

import {AuthService} from '../auth.service';
import {CodeSendInput} from '@shared/service-proxies/service-proxies';
import {SmsService} from '@core/service/sms.service';
import {UtilsService} from '@abp/utils/utils.service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService]
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenSvc: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private authSvc: AuthService,
    private smsSvc: SmsService,
    private _utilsService: UtilsService
  ) {
    this.form = fb.group({
      loginCertificate: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      phoneNum: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      loginCode: [null, [Validators.required]],
      rememberClient: [true]
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.loginCertificate;
  }

  get password() {
    return this.form.controls.password;
  }

  get mobile() {
    return this.form.controls.phoneNum;
  }

  get captcha() {
    return this.form.controls.loginCode;
  }

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // #region get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({onlySelf: true});
      this.mobile.updateValueAndValidity({onlySelf: true});
      return;
    }

    const data = new CodeSendInput({
      targetNumber: this.mobile.value,
      codeType: 20,
      captchaResponse: ''
    });

    this.smsSvc.send(data).subscribe(res => {
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
    console.log(this.form);
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      this.userName.enable();
      this.password.enable();
      this.mobile.disable();
      this.captcha.disable();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      this.userName.disable();
      this.password.disable();
      this.mobile.enable();
      this.captcha.enable();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    this.authSvc.login(this.form.value).subscribe((res) => {
      if (!res.success) {
        this.msg.error(res.error.message);
        return false;
      }
      // 清空路由复用信息
      this.reuseTabService.clear();
      // 设置用户Token信息
      this.tokenSvc.set({
        token: res.result.accessToken
      });
      abp.auth.setToken(res.result.accessToken);

      // 设置租户id
      abp.multiTenancy.setTenantIdCookie(res.result.tenantId);

      // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
      this.startupSrv.load().then(() => {
        let url = this.tokenSvc.referrer.url || '/';
        if (url.includes('/passport')) url = '/';
        window.location.href = '/';
        /*this.router.navigateByUrl(url);*/
      });
    });

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    /*this.http
      .post('/login/account?_allow_anonymous=true', {
        type: this.type,
        userName: this.userName.value,
        password: this.password.value,
      })
      .subscribe((res: any) => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          return;
        }
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          let url = this.tokenService.referrer.url || '/';
          if (url.includes('/passport')) url = '/';
          this.router.navigateByUrl(url);
        });
      });*/
  }

  // #region social

  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``;
    let callback = ``;
    if (environment.production) {
      callback = 'https://ng-alain.github.io/ng-alain/#/callback/' + type;
    } else {
      callback = 'http://localhost:4200/#/callback/' + type;
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
          callback
        )}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window'
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href'
      });
    }
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
