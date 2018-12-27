import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'layout-pro-search',
  templateUrl: 'search.component.html',
  host: {
    '[class.alain-pro__header-item]': 'true',
    '[class.alain-pro__header-search]': 'true',
  },
  preserveWhitespaces: false,
})
export class LayoutProWidgetSearchComponent implements OnInit, OnDestroy {
  @ViewChild('ipt')
  private ipt: ElementRef<any>;
  show = false;
  q: string;
  search$ = new Subject<string>();
  list: any[] = [];

  constructor(private http: _HttpClient) {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        flatMap((q: string) => {
          // via http
          // return http.get<any[]>('/search', { q });
          return of(['搜索提示一', '搜索提示二', '搜索提示三']);
        }),
      )
      .subscribe(res => (this.list = res));
  }

  @HostListener('click')
  _click() {
    this.ipt.nativeElement.focus();
    this.show = true;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
