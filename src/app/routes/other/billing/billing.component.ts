import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange } from '@delon/abc';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingComponent {
  @ViewChild('st')
  private st: STComponent;

  params: any = {};

  url = `/billing`;

  columns: STColumn[] = [
    {
      title: 'ID',
      index: 'id',
      type: 'checkbox',
      selections: [
        {
          text: 'Rejected',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status === 'Rejected')),
        },
        {
          text: 'Pending',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status === 'Pending')),
        },
        {
          text: 'Completed',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status === 'Completed')),
        },
      ],
    },
    { title: 'ORDER', index: 'order' },
    { title: 'CLIENT', index: 'client' },
    { title: 'AMOUNT', index: 'amount', type: 'currency' },
    { title: 'DATE', index: 'date', type: 'date', dateFormat: 'DD MMM' },
    { title: 'STATUS', index: 'status', render: 'status' },
  ];

  constructor(public msg: NzMessageService) {}

  _click(e: STChange) {
    if (e.type === 'click') {
      // Should prevent tr click trigger when clicking expand
      // So click expand to repeat the trigger
      // https://github.com/NG-ZORRO/ng-zorro-antd/issues/2419
      e.click.item.expand = !e.click.item.expand;
    }
  }
}
