import {
  Component,
  OnInit
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LocationStrategy} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import {TenantInfoEditDto, TenantServiceProxy} from '@shared/service-proxies/service-proxies';
import {getIndex} from '@shared/utils/utils';

@Component({
  selector: 'app-tenant-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class TenantEditComponent implements OnInit {
  id = this.route.snapshot.params['id'];
  tenant;
  features;

  constructor(private route: ActivatedRoute,
              private location: LocationStrategy,
              private tenantSvc: TenantServiceProxy) {
  }

  ngOnInit() {
    if (this.id !== '0') {
      const features = [];
      this.tenantSvc.getTenantForEdit(this.id).subscribe(res => {
        this.tenant = res.tenant;
        console.log(res);
        res.features.features.forEach(item => {
          item['value'] = res.features.featureValues[getIndex(res.features.featureValues, 'name', item.name)].value;
          features.push(item);
        });
        this.features = features;
        console.log(this.features);
      });
    }
  }

  submit() {
    console.log('submit');
  }

  cancel() {
    this.location.back();
  }
}
