import { Component, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Menu, MenuService } from '@delon/theme';
import { ProService } from '../../pro.service';
import { ProMenu } from '../../pro.types';

@Component({
  selector: '[layout-pro-menu]',
  templateUrl: './menu.component.html',
  host: {
    '[class.alain-pro__menu]': 'true',
    '[class.alain-pro__menu-only-icon]': 'pro.onlyIcon',
  },
})
export class LayoutProMenuComponent implements OnDestroy {
  private menu$: Subscription;
  private router$: Subscription;
  @Input()
  mode = 'inline';

  menus: ProMenu[];

  constructor(
    menuSrv: MenuService,
    private router: Router,
    public pro: ProService,
  ) {
    this.menu$ = menuSrv.change.subscribe(res => this.genMenus(res));

    this.router$ = router.events
      .pipe(filter(e => e instanceof NavigationEnd && pro.isSideMenu))
      .subscribe(() => this.openStatus());
  }

  private genMenus(data: Menu[]) {
    const res: ProMenu[] = [];
    const inFn = (list: ProMenu[], parent: ProMenu) => {
      for (const item of list) {
        item.__parent = parent;
        if (item._hidden === true) {
          continue;
        }
        if (parent === null) {
          res.push(item);
        }
        if (item.children && item.children.length > 0) {
          inFn(item.children, item);
        } else {
          item.children = [];
        }
      }
    };
    // ingores category menus
    const ingoreCategores = data.reduce(
      (prev, cur) => prev.concat(cur.children),
      [],
    );
    inFn(ingoreCategores, null);
    this.menus = res;

    this.openStatus();
  }

  private getHit(url: string): ProMenu {
    let cur: ProMenu;
    const inFn = (list: ProMenu[], value: string) => {
      for (const i of list) {
        if (!cur && i.link === value) {
          cur = i;
          break;
        }
        if (i.children && i.children.length > 0) {
          inFn(i.children, value);
        }
      }
    };

    while (!cur && url) {
      inFn(this.menus, url);
      url = url
        .split('/')
        .slice(0, -1)
        .join('/');
    }

    return cur;
  }

  private openStatus() {
    const inFn = (list: ProMenu[]) => {
      for (const i of list) {
        i._open = false;
        i._selected = false;
        if (i.children.length > 0) {
          inFn(i.children);
        }
      }
    };
    inFn(this.menus);

    let item = this.getHit(this.router.url);
    if (!item) return;
    do {
      item._selected = true;
      if (!this.pro.isTopMenu) {
        item._open = true;
      }
      item = item.__parent;
    } while (item);
  }

  openChange(item: ProMenu, statue: boolean) {
    const data = item.__parent ? item.__parent.children : this.menus;
    if (data && data.length <= 1) return;
    data.forEach(i => (i._open = false));
    item._open = statue;
  }

  click(item: ProMenu) {
    if (item.externalLink) {
      if (item.target === '_blank') {
        window.open(item.externalLink);
      } else {
        location.href = item.externalLink;
      }
      return;
    }
    this.router.navigateByUrl(item.link);
    if (this.pro.isMobile) {
      setTimeout(() => this.pro.setCollapsed(true));
    }
  }

  ngOnDestroy() {
    this.menu$.unsubscribe();
    this.router$.unsubscribe();
  }
}
