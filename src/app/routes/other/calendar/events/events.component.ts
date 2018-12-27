import {
  Component,
  ChangeDetectionStrategy,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Draggable } from 'fullcalendar';

import { I18NService } from '@core/i18n/i18n.service';
import { CalendarTheme } from '../calendar.theme';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventsComponent extends CalendarTheme
  implements OnInit, OnDestroy {
  private draggable: Draggable;
  @ViewChild('external') private readonly externalEl: ElementRef;
  removeAfterDrop = false;

  events = [
    {
      id: 1,
      children: [
        { title: 'Happy', className: 'fc-event-success' },
        { title: 'Metting', className: 'fc-event-warning' },
        { title: 'Dinner', className: 'fc-event-magenta' },
        { title: 'Lunch' },
      ],
    },
    {
      id: 2,
      children: [
        { title: 'Reporting', className: 'fc-event-success' },
        { title: 'Happy Hour', className: 'fc-event-purple' },
        { title: 'Click for Ng Alain', className: 'fc-event-success' },
      ],
    },
  ];

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
      droppable: true,
      drop: (info: any) => {
        if (!this.removeAfterDrop) return;
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      },
    };

    this.init();

    this.draggable = new Draggable(this.externalEl.nativeElement, {
      itemSelector: '.fc-event',
      eventData: eventEl => {
        return {
          title: eventEl.innerText.trim(),
        };
      },
    });
    this.loadEvents(new Date());
  }

  ngOnDestroy() {
    this.draggable.destroy();
    this.destroy();
  }
}
