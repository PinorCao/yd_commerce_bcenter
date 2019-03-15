import {Component} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzMessageService, NzDrawerRef} from 'ng-zorro-antd';
import {LogisticsServiceProxy} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-order-list-memo',
  templateUrl: './memo.component.html'
})
export class OrderListMemoComponent {
  i: any = {};
  logistics;

  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private drawer: NzDrawerRef,
    private logisticsSvc: LogisticsServiceProxy) {
    logisticsSvc.getTenantLogisticsSelectList().subscribe(res => {
      console.log(res);
    });
  }

  save() {
    this.http
      .post('/trade/memo', {
        id: this.i.id,
        memo: this.i.memo
      })
      .subscribe(() => {
        this.msg.success('Success');
        this.drawer.close(this.i);
      });
  }

  close() {
    this.drawer.close();
  }
}
