import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SysUserComponent} from './user/user.component';
import {SysUserViewComponent} from './user/view/view.component';
import {SysUserEditComponent} from './user/edit/edit.component';
import {SysMenuComponent} from './menu/menu.component';
import {SysPermissionComponent} from './permission/permission.component';
import {SysRoleComponent} from './role/role.component';
import {SysLogComponent} from './log/log.component';
import {SysFileManagerComponent} from './file-manager/file-manager.component';
import {SysSettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {path: 'user', component: SysUserComponent},
  {path: 'user/:id', component: SysUserViewComponent},
  {path: 'user/edit/:id', component: SysUserEditComponent},
  {path: 'menu', component: SysMenuComponent},
  {path: 'permission', component: SysPermissionComponent},
  {path: 'role', component: SysRoleComponent},
  {path: 'log', component: SysLogComponent},
  {path: 'file-manager', component: SysFileManagerComponent},
  {path: 'settings', component: SysSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule {
}
