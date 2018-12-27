import { _HttpClient } from '@delon/theme';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { filter, concatMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { ProService } from 'app/layout/pro/pro.service';
import { ScrollbarDirective } from '@shared/components/scrollbar/scrollbar.directive';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  private pro$: Subscription;
  private msg$: Subscription;
  private inited = false;
  userVisible = false;
  q = '';
  i: any = null;
  user: any;
  messages: any[] = [];
  text = '';

  @ViewChild('messageScrollbar')
  messageScrollbar?: ScrollbarDirective;

  constructor(
    public pro: ProService,
    private http: _HttpClient,
    public msg: NzMessageService,
    private cd: ChangeDetectorRef,
  ) {
    this.pro$ = pro.notify
      .pipe(filter(() => this.inited))
      .subscribe(() => this.cd.detectChanges());
  }

  private scrollToBottom() {
    this.cd.detectChanges();
    setTimeout(() => this.messageScrollbar.scrollToBottom());
  }

  ngOnInit() {
    this.inited = true;
    this.findUser();
    this.msg$ = timer(0, 1000 * 3)
      .pipe(concatMap(() => this.http.get('/chat/message')))
      .subscribe((res: any) => {
        this.messages.push(res);
        this.scrollToBottom();
      });
  }

  findUser() {
    this.http.get('/chat', { q: this.q }).subscribe((res: any) => {
      this.i = res;
      this.user = res.users[1];
      this.user.active = true;
      this.cd.detectChanges();
    });
  }

  choUser(i: any) {
    if (this.user.id === i.id) return;
    this.user.active = false;
    i.active = true;
    this.user = i;
    this.messages.length = 0;
    this.cd.detectChanges();
    setTimeout(() => this.messageScrollbar.scrollToTop());
  }

  enterSend(e: KeyboardEvent) {
    if (e.keyCode !== 13) return;
    this.send();
  }

  send() {
    if (!this.text) return;

    this.messages.push({
      type: 'text',
      msg: this.text,
      dir: 'right',
    });
    this.text = '';
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.msg$.unsubscribe();
    this.pro$.unsubscribe();
  }
}
