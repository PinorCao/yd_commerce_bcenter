import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SortablejsOptions } from 'angular-sortablejs';
import { ProService } from 'app/layout/pro/pro.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  type = 1;
  list: any[] = [];
  options: SortablejsOptions = {
    handle: '.task__item-handle',
    group: 'task',
    onAdd: (e: any) => {
      const typeId = +e.to.dataset.id;
      if (typeId !== 2) return;

      const type = this.list.find(w => w.id === typeId);
      const item = type.list[e.newIndex];
      item.done = false;
    },
  };

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    public pro: ProService,
  ) {}

  ngOnInit() {
    this.http.get('/task').subscribe((res: any) => (this.list = res));
  }

  del(p: any, i: any, idx: number) {
    this.http.delete('/task', { cid: p.id, id: i.id }).subscribe(() => {
      this.msg.success('Success');
      p.list.splice(idx, 1);
    });
  }
}
