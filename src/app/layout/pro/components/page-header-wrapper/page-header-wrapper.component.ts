import { Component, Input, TemplateRef } from '@angular/core';
import { InputBoolean } from '@delon/util';
import { ProService } from '../../pro.service';
import { PageHeaderConfig } from '@delon/abc';

@Component({
  selector: 'page-header-wrapper',
  templateUrl: './page-header-wrapper.component.html',
  preserveWhitespaces: false,
  host: {
    '[class.alain-pro__page-header-wrapper]': 'true',
  },
})
export class ProPageHeaderWrapperComponent {
  // #region page-header fields
  @Input()
  title: string | TemplateRef<any>;

  @Input()
  @InputBoolean()
  loading = false;

  @Input()
  home: string;

  @Input()
  homeLink: string;

  @Input()
  homeI18n: string;

  /**
   * 自动生成导航，以当前路由从主菜单中定位
   */
  @Input()
  @InputBoolean()
  autoBreadcrumb = true;

  /**
   * 自动生成标题，以当前路由从主菜单中定位
   */
  @Input()
  @InputBoolean()
  autoTitle = true;

  /**
   * 是否自动将标题同步至 `TitleService`、`ReuseService` 下，仅 `title` 为 `string` 类型时有效
   */
  @Input()
  @InputBoolean()
  syncTitle = true;

  @Input()
  breadcrumb: TemplateRef<any>;

  @Input()
  logo: TemplateRef<any>;

  @Input()
  action: TemplateRef<any>;

  @Input()
  content: TemplateRef<any>;

  @Input()
  extra: TemplateRef<any>;

  @Input()
  tab: TemplateRef<any>;

  @Input()
  phContent: TemplateRef<any>;
  // #endregion

  // #region fields

  @Input()
  top: TemplateRef<any>;

  @Input()
  @InputBoolean()
  noSpacing = false;

  @Input()
  style: any;

  // #endregion

  constructor(public pro: ProService, cog: PageHeaderConfig) {
    Object.assign(this, cog, { syncTitle: true });
  }
}
