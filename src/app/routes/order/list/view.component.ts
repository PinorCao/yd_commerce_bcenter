import {
  Component,
  OnInit
} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzMessageService, NzDrawerRef} from 'ng-zorro-antd';
import {OrderServiceProxy} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-order-list-view',
  templateUrl: './view.component.html'
})
export class OrderListViewComponent implements OnInit {
  i: any = {};
  loading = false;

  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private drawer: NzDrawerRef,
    private orderSvc: OrderServiceProxy) {
  }

  ngOnInit() {
    this.loading = true;
    this.orderSvc.getOrderDetail(this.i.id).subscribe(res => {
      this.i = res;
      this.loading = false;
      console.log(this.i);
    });
    /*this.http.get(`/trade/${this.i.id}`).subscribe(res => {
      this.i = res;
      this.loading = false;
    });*/
  }

  status(status: string) {
    this.http
      .post('/trade/status', {
        id: this.i.id,
        status
      })
      .subscribe((res: any) => {
        this.msg.success('Success');
        this.i = res.item;
      });
  }

  close() {
    this.drawer.close();
  }
}
