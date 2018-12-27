import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SettingsService, Layout } from '@delon/theme';

import { environment } from '@env/environment';
import { ProLayout } from './pro.types';

@Injectable({ providedIn: 'root' })
export class ProService {
  private notify$ = new BehaviorSubject(null);
  private _isMobile = false;

  // #region fields

  get notify() {
    return this.notify$.asObservable();
  }

  readonly width = 256;

  readonly widthInCollapsed = 80;

  readonly headerHeight = 64;

  readonly autoHideHeaderTop = 300;

  get isMobile() {
    return this._isMobile;
  }

  get layout(): ProLayout {
    return this.settings.layout as ProLayout;
  }

  get collapsed() {
    return this.layout.collapsed;
  }

  get theme() {
    return this.layout.theme;
  }

  get menu() {
    return this.layout.menu;
  }

  get contentWidth() {
    return this.layout.contentWidth;
  }

  get fixedHeader() {
    return this.layout.fixedHeader;
  }

  get autoHideHeader() {
    return this.layout.autoHideHeader;
  }

  get fixSiderbar() {
    return this.layout.fixSiderbar;
  }

  get onlyIcon() {
    return this.layout.onlyIcon;
  }

  /** 是否顶部菜单 */
  get isTopMenu() {
    return this.menu === 'top' && !this.isMobile;
  }

  /** 是否顶部菜单 */
  get isSideMenu() {
    return this.menu === 'side' && !this.isMobile;
  }

  /** 是否固定内容 */
  get isFixed() {
    return this.contentWidth === 'fixed';
  }

  // #endregion

  constructor(bm: BreakpointObserver, private settings: SettingsService) {
    // fix layout data
    settings.setLayout(
      Object.assign(
        {
          theme: 'dark',
          menu: 'side',
          contentWidth: 'fluid',
          fixedHeader: false,
          autoHideHeader: false,
          fixSiderbar: false,
          onlyIcon: true,
        },
        (environment as any).pro,
        settings.layout,
      ),
    );

    const mobileMedia = 'only screen and (max-width: 767.99px)';
    bm.observe(mobileMedia).subscribe(state => this.checkMedia(state.matches));
    this.checkMedia(bm.isMatched(mobileMedia));
  }

  private checkMedia(value: boolean) {
    this._isMobile = value;
    this.layout.collapsed = this._isMobile;
    this.notify$.next(null);
  }

  setLayout(name: string | Layout, value?: any) {
    this.settings.setLayout(name, value);
    this.notify$.next(null);
  }

  setCollapsed(status?: boolean) {
    this.setLayout(
      'collapsed',
      typeof status !== 'undefined' ? status : !this.collapsed,
    );
  }
}
