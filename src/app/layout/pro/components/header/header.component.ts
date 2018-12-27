import {
  Component,
  OnDestroy,
  OnInit,
  HostBinding,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { ProService } from '../../pro.service';

@Component({
  selector: 'layout-pro-header',
  templateUrl: './header.component.html',
  host: {
    '[class.ant-layout-header]': 'true',
    '[class.alain-pro__header-fixed]': 'pro.fixedHeader',
    '[class.alain-pro__header-hide]': 'hideHeader',
    '[style.padding.px]': '0',
  },
})
export class LayoutProHeaderComponent implements OnInit, OnDestroy {
  private notify$: Subscription;
  private scroll$: Subscription;

  hideHeader = false;

  @HostBinding('style.width')
  get getHeadWidth() {
    const {
      isMobile,
      fixedHeader,
      menu,
      collapsed,
      width,
      widthInCollapsed,
    } = this.pro;
    if (isMobile || !fixedHeader || menu === 'top') {
      return '100%';
    }
    return collapsed
      ? `calc(100% - ${widthInCollapsed}px)`
      : `calc(100% - ${width}px)`;
  }

  constructor(public pro: ProService, @Inject(DOCUMENT) private doc: any) {}

  private handScroll() {
    if (!this.pro.autoHideHeader) {
      this.hideHeader = false;
      return;
    }
    setTimeout(() => {
      this.hideHeader =
        this.doc.body.scrollTop + this.doc.documentElement.scrollTop >
        this.pro.autoHideHeaderTop;
    });
  }

  ngOnInit() {
    this.notify$ = this.pro.notify.subscribe(() => this.handScroll());
    this.scroll$ = fromEvent(window, 'scroll', { passive: false })
      .pipe(
        throttleTime(50),
        distinctUntilChanged(),
      )
      .subscribe(() => this.handScroll());
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
    this.scroll$.unsubscribe();
  }
}
