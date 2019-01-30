import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { GoodsService } from '../goods.service';

@Component({
  selector: 'app-goods-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class GoodsEditComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private msgSvc: NzMessageService,
    private storeSvc: GoodsService) {
  }

  ngOnInit() {
  }

  save() {
  }

  cancel() {
  }

  ngOnDestroy(): void {
  }
}
