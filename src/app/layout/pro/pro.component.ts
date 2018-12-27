import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  NavigationError,
} from '@angular/router';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { updateHostClass } from '@delon/util';
import { ScrollService } from '@delon/theme';
import { ReuseTabService } from '@delon/abc';

import { environment } from '@env/environment';

import { ProSettingDrawerComponent } from './setting-drawer/setting-drawer.component';
import { ProService } from './pro.service';

@Component({
  selector: 'layout-pro',
  templateUrl: './pro.component.html',
})
export class LayoutProComponent implements OnInit, AfterViewInit, OnDestroy {
  private notify$: Subscription;
  private queryCls: string;
  isFetching = false;
  @ViewChild('settingHost', { read: ViewContainerRef })
  settingHost: ViewContainerRef;

  get isMobile() {
    return this.pro.isMobile;
  }

  get getLayoutStyle() {
    const {
      isMobile,
      fixSiderbar,
      collapsed,
      menu,
      width,
      widthInCollapsed,
    } = this.pro;
    if (fixSiderbar && menu !== 'top' && !isMobile) {
      return {
        paddingLeft: (collapsed ? widthInCollapsed : width) + 'px',
      };
    }
    return null;
  }

  get getContentStyle() {
    const { fixedHeader, headerHeight } = this.pro;
    return {
      margin: '24px 24px 0',
      'padding-top': (fixedHeader ? headerHeight : 0) + 'px',
    };
  }

  constructor(
    bm: BreakpointObserver,
    mediaMatcher: MediaMatcher,
    router: Router,
    msg: NzMessageService,
    scroll: ScrollService,
    reuseTabSrv: ReuseTabService,
    private resolver: ComponentFactoryResolver,
    private el: ElementRef,
    private renderer: Renderer2,
    public pro: ProService,
    @Inject(DOCUMENT) private doc: any,
  ) {
    // scroll to top in change page
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
        scroll.scrollToTop();
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        msg.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.isFetching = false;
      // If have already cached router, should be don't need scroll to top
      if (!reuseTabSrv.exists(evt.url)) {
        scroll.scrollToTop();
      }
    });

    // media
    const query = {
      'screen-xs': '(max-width: 575px)',
      'screen-sm': '(min-width: 576px) and (max-width: 767px)',
      'screen-md': '(min-width: 768px) and (max-width: 991px)',
      'screen-lg': '(min-width: 992px) and (max-width: 1199px)',
      'screen-xl': '(min-width: 1200px)',
    };
    bm.observe([
      '(min-width: 1200px)',
      '(min-width: 992px) and (max-width: 1199px)',
      '(min-width: 768px) and (max-width: 991px)',
      '(min-width: 576px) and (max-width: 767px)',
      '(max-width: 575px)',
    ]).subscribe(() => {
      this.queryCls = Object.keys(query).find(
        key => mediaMatcher.matchMedia(query[key]).matches,
      );
      this.setClass();
    });
  }

  private setClass() {
    const { el, renderer, queryCls, pro } = this;
    updateHostClass(
      el.nativeElement,
      renderer,
      {
        [`layout-fixed`]: pro.layout.fixed,
        [`aside-collapsed`]: pro.collapsed,
        ['alain-pro']: true,
        [queryCls]: true,
        [`alain-pro__content-${pro.layout.contentWidth}`]: true,
        [`alain-pro__fixed`]: pro.layout.fixedHeader,
        [`alain-pro__wide`]: pro.isFixed,
      },
      true,
    );
  }

  private setColorWeak(status: boolean) {
    this.doc.body.classList[status ? 'add' : 'remove']('color-weak');
  }

  ngAfterViewInit(): void {
    // Setting componet for only developer
    if (!environment.production) {
      setTimeout(() => {
        const settingFactory = this.resolver.resolveComponentFactory(
          ProSettingDrawerComponent,
        );
        this.settingHost.createComponent(settingFactory);
      }, 22);
    }
  }

  ngOnInit() {
    const { pro } = this;
    this.notify$ = pro.notify.subscribe(() => {
      this.setClass();
      this.setColorWeak(pro.layout.colorWeak);
    });
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
}
