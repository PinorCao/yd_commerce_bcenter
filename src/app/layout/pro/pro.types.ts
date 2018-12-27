import { Layout, Menu } from '@delon/theme';

export interface ProLayout extends Layout {
  theme: 'light' | 'dark';
  /**
   * menu position
   */
  menu: 'side' | 'top';
  /**
   * layout of content, only works when menu is top
   */
  contentWidth: 'fluid' | 'fixed';
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  /**
   * 只显示图标
   * 受限于 [#2183](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2183) 的一个临时解决方案
   */
  onlyIcon: boolean;
  /**
   * 色弱模式
   */
  colorWeak: boolean;
}

export interface ProMenu extends Menu {
  /** 父 */
  __parent?: ProMenu;
  /** 是否隐藏 */
  _hidden?: boolean;
  /** 是否选中 */
  _selected?: boolean;
  /** 是否展开 */
  _open?: boolean;
  /** 二级菜单 */
  children?: ProMenu[];
}
