import {
  Component
} from '@angular/core';

import {OrderServiceProxy} from '@shared/service-proxies/service-proxies';
import {_HttpClient, DrawerHelper} from '@delon/theme';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {OrderListViewComponent} from './view.component';
import {OrderListMemoComponent} from './memo.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class OrderListComponent {
  data;
  loading = false;

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  mapOfCheckedId = {};
  mapOfExpandData = {};
  numberOfChecked = 0;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private drawer: DrawerHelper,
    private orderSvc: OrderServiceProxy) {
  }

  ngOnInit() {
    this.getData();
  }

  filterChange(target, e) {
    this.q[target] = e;
    console.log(this.q[target]);
    this.getData();
  }

  checkAll(value: boolean): void {
    this.data.items.forEach(item => this.mapOfCheckedId[item.id] = value);
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.data.items.filter(item => !item.disabled).every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.data.items.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.data.items.filter(item => this.mapOfCheckedId[item.id]).length;
    console.log(this.mapOfCheckedId);
  }

  q = {
    productIds: [],
    logisticsNumber: undefined,
    orderNumber: undefined,
    createOn_FormDate: undefined,
    createOn_ToDate: undefined,
    receiveOn_FormDate: undefined,
    receiveOn_ToDate: undefined,
    shippingName: undefined,
    phoneNumber: undefined,
    provinceId: undefined,
    cityId: undefined,
    districtId: undefined,
    orderStatus: [],
    paymentStatus: [],
    shippingStatus: [],
    orderTypes: [],
    orderSource: [],
    sorting: undefined,
    maxResultCount: 10,
    skipCount: 0
  };

  getData() {
    console.log(this.q);
    this.loading = true;
    this.orderSvc.getOrders(this.q.productIds,
      this.q.logisticsNumber,
      this.q.orderNumber,
      this.q.createOn_FormDate,
      this.q.createOn_ToDate,
      this.q.receiveOn_FormDate,
      this.q.receiveOn_ToDate,
      this.q.shippingName,
      this.q.phoneNumber,
      this.q.provinceId,
      this.q.cityId,
      this.q.districtId,
      this.q.orderStatus,
      this.q.paymentStatus,
      this.q.shippingStatus,
      this.q.orderTypes,
      this.q.orderSource,
      this.q.sorting,
      this.q.maxResultCount,
      this.q.skipCount).subscribe(res => {
      this.loading = false;
      this.data = res;
      console.log(this.data);
    });
  }

  arrayToString(arr) {
    let str = '';
    arr.forEach(item => {
      if (str) {
        str = str + item;
      } else {
        str = ',' + item;
      }
    });
    return str;
  }

  view(i: any) {
    this.drawer
      .create(`查看订单 #${i.orderNumber}`, OrderListViewComponent, {i}, {size: 666})
      .subscribe();
  }

  sendShip() {
    this.drawer
      .create(`批量发货`, OrderListMemoComponent, {}, {size: 350})
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  remove() {
    /*this.http
      .delete('/rule', {nos: this.selectedRows.map(i => i.no).join(',')})
      .subscribe(() => {
        this.getData();
      });*/
  }

  search() {
    this.getData();
  }

  reset() {
    this.q.orderNumber = undefined;
  }
}
