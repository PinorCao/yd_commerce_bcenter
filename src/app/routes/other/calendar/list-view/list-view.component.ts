import {
  Component,
  ChangeDetectionStrategy,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { CalendarTheme } from '../calendar.theme';

@Component({
  selector: 'app-calendar-list-view',
  templateUrl: './list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarListViewComponent extends CalendarTheme
  implements OnInit, OnDestroy {
  constructor(private http: _HttpClient, zone: NgZone, i18n: I18NService) {
    super(zone, i18n);
  }

  private loadEvents(time: Date) {
    this.http.get(`/calendar?time=${+time}`).subscribe((res: any) => {
      this.instance.addEventSource({
        allDayDefault: true,
        events: res,
      });
    });
  }

  ngOnInit() {
    this.options = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaDay,listWeek',
      },
      defaultView: 'listWeek',
      height: 900,
    };
    this.init();
    this.loadEvents(new Date());
  }

  ngOnDestroy() {
    this.destroy();
  }
}
