import {
  Component,
  OnInit
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {TenantInfoEditDto, TenantServiceProxy} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-tenant-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class TenantEditComponent implements OnInit {
  id = this.route.snapshot.params['id'];
  tenantForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private tenantSvc: TenantServiceProxy) {
  }

  ngOnInit() {
    if (this.id !== '0') {
      this.tenantSvc.getTenantForEdit(this.id).subscribe(res => {
        console.log(res);
      });
    }
  }
}
