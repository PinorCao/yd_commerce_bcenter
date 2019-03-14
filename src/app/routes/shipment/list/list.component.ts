import {
  Component
} from '@angular/core';
import {OrderServiceProxy} from '@shared/service-proxies/service-proxies';
import {
  ShipmentServiceProxy,
  ShippingStatuses,
  CommonLookupServiceProxy
} from '@shared/service-proxies/service-proxies';
import {_HttpClient, DrawerHelper} from '@delon/theme';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ShipmentListComponent {
  orderSources = [
    {index: 0, text: '自营', value: 10, type: 'default', checked: false},
    {index: 1, text: '鲁班', value: 20, type: 'default', checked: false},
    {index: 2, text: '放心购', value: 30, type: 'default', checked: false},
    {index: 3, text: '广点通', value: 40, type: 'default', checked: false},
    {index: 4, text: '有赞', value: 50, type: 'default', checked: false}
  ];
  orderStatus = [
    {index: 0, text: '待确认', value: 10, type: 'default', checked: false},
    {index: 1, text: '处理中', value: 20, type: 'default', checked: false},
    {index: 2, text: '已完成', value: 30, type: 'default', checked: false},
    {index: 3, text: '已取消', value: 40, type: 'default', checked: false}
  ];
  orderTypes = [
    {index: 0, text: '在线支付', value: 1, type: 'default', checked: false},
    {index: 1, text: '化到付款', value: 2, type: 'default', checked: false}
  ];
  paymentStatus = [
    {index: 0, text: '未付款', value: 10, type: 'default', checked: false},
    {index: 1, text: '已付款', value: 20, type: 'default', checked: false},
    {index: 2, text: '部分退款', value: 30, type: 'default', checked: false},
    {index: 3, text: '已退款', value: 40, type: 'default', checked: false}
  ];
  shippingStatus = [
    {index: 0, text: '待取件', value: 0, type: 'default', checked: false},
    {index: 1, text: '已揽收', value: 1, type: 'default', checked: false},
    {index: 2, text: '在途', value: 2, type: 'default', checked: false},
    {index: 3, text: '已签收', value: 3, type: 'default', checked: false},
    {index: 4, text: '问题件', value: 4, type: 'default', checked: false},
    {index: 5, text: '不需要发货', value: 10, type: 'default', checked: false},
    {index: 6, text: '未发货', value: 20, type: 'default', checked: false},
    {index: 7, text: '部分发货', value: 25, type: 'default', checked: false},
    {index: 8, text: '到达派件城市', value: 201, type: 'default', checked: false},
    {index: 9, text: '派件中', value: 202, type: 'default', checked: false},
    {index: 10, text: '拒收(退件)', value: 404, type: 'default', checked: false},
    {index: 11, text: '取消', value: 500, type: 'default', checked: false},
    {index: 12, text: '拦截', value: 600, type: 'default', checked: false}
  ];
  data: any[] = [];
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
    private enumsSvc: CommonLookupServiceProxy,
    private orderSvc: OrderServiceProxy,
    private shipmentSvc: ShipmentServiceProxy) {
  }

  ngOnInit() {
    this.getData();
    console.log(ShippingStatuses);
  }

  filterChange(target, e) {
    this.q[target] = e;
    console.log(this.q[target]);
    this.getData();
  }

  checkAll(value: boolean): void {
    this.data.forEach(item => this.mapOfCheckedId[item.id] = value);
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.data.filter(item => !item.disabled).every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.data.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.data.filter(item => this.mapOfCheckedId[item.id]).length;
    console.log(this.mapOfCheckedId);
  }

  q = {
    status: undefined,
    trackingNumber: undefined,
    deliveryFrom: undefined,
    deliveryTo: undefined,
    receivedFrom: undefined,
    receivedTo: undefined,
    sorting: undefined,
    maxResultCount: 20,
    skipCount: 0
  };

  getData() {
    this.loading = true;
    this.shipmentSvc.getShipments(this.q.status,
      this.q.trackingNumber,
      this.q.deliveryFrom,
      this.q.deliveryTo,
      this.q.receivedFrom,
      this.q.receivedTo,
      this.q.sorting,
      this.q.maxResultCount,
      this.q.skipCount).subscribe(res => {
        this.data = res.items;
        console.log(res);
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

  remove() {
    /*this.http
      .delete('/rule', {nos: this.selectedRows.map(i => i.no).join(',')})
      .subscribe(() => {
        this.getData();
      });*/
  }
}
