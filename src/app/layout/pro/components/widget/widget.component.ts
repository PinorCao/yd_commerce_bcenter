import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ProService } from '../../pro.service';

@Component({
  selector: '[layout-pro-header-widget]',
  templateUrl: './widget.component.html',
  host: {
    '[class.alain-pro__header-right]': 'true',
    '[class.alain-pro__header-right-dark]': 'isDark',
  },
})
export class LayoutProHeaderWidgetComponent {
  get isDark() {
    const l = this.pro.layout;
    return l.menu === 'top' && l.theme === 'dark';
  }

  constructor(
    private pro: ProService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
