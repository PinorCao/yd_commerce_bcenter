import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SortablejsOptions } from 'angular-sortablejs';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
})
export class KanbanBoardComponent implements OnInit {
  list: any[] = [];
  options: SortablejsOptions = {
    group: 'kanban',
    filter: '.no-data'
  };

  constructor(private http: _HttpClient, public msg: NzMessageService) {}

  ngOnInit() {
    this.http.get('/kanban-board').subscribe((res: any) => (this.list = res));
  }

  del(p: any, i: any, idx: number) {
    this.http.delete('/kanban-board', { cid: p.id, id: i.id }).subscribe(() => {
      this.msg.success('Success');
      p.list.splice(idx, 1);
    });
  }
}
