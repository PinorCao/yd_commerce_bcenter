import {
  Component
} from '@angular/core';

import {OrderServiceProxy, ProductServiceProxy} from '@shared/service-proxies/service-proxies';
import {_HttpClient, DrawerHelper} from '@delon/theme';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-goods-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GoodsListComponent {
  data: any[] = [];
  loading = false;

  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId = {};
  numberOfChecked = 0;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private drawer: DrawerHelper,
    private orderSvc: OrderServiceProxy,
    private productSvc: ProductServiceProxy) {
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
    this.data.forEach(item => this.mapOfCheckedId[item.id] = value);
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.data.filter(item => !item.disabled).every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.data.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.data.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  q = {
    name: undefined,
    sku: undefined,
    sorting: undefined,
    maxResultCount: 20,
    skipCount: 0
  };

  getData() {
    this.productSvc.getProducts('', '', '', 20, 0).subscribe(res => {
      this.loading = false;
      this.data = res.items;
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

  /*view(i: any) {
    this.drawer
      .create(`查看订单 #${i.orderNumber}`, OrderListViewComponent, {i}, {size: 666})
      .subscribe();
  }*/

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
    this.q.name = undefined;
  }
}
