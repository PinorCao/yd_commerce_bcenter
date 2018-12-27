import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-project-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectViewComponent implements OnInit, OnDestroy {
  private router$: Subscription;
  idx = 0;
  id = 0;
  i: any;
  options: SortablejsOptions = {
    handle: '.task__item-handle',
    group: 'task',
    onAdd: (e: any) => {
      const typeId = +e.to.dataset.id;
      if (typeId !== 2) return;

      const type = this.i.tasks.find(w => w.id === typeId);
      const item = type.list[e.newIndex];
      item.done = false;
    },
  };

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    public msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.router$ = this.route.params.subscribe(res => {
      this.id = res.id || 0;
      this.load();
    });
  }

  load() {
    this.http.get(`/project/${this.id}`).subscribe((res: any) => {
      this.i = res;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
