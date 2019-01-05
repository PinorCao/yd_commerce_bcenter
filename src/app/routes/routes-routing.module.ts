import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {environment} from '@env/environment';
// layout
import {LayoutProComponent} from '../layout/pro/pro.component';
import {LayoutPassportComponent} from '../layout/passport/passport.component';
// dashboard pages
import {DashboardAnalysisComponent} from './dashboard/analysis/analysis.component';
import {DashboardMonitorComponent} from './dashboard/monitor/monitor.component';
import {DashboardWorkplaceComponent} from './dashboard/workplace/workplace.component';
// passport pages
import {UserLoginComponent} from './passport/login/login.component';
import {UserRegisterComponent} from './passport/register/register.component';
import {UserRegisterResultComponent} from './passport/register-result/register-result.component';
import {UserLockComponent} from './passport/lock/lock.component';
// single pages
import {UserLogin2Component} from './passport/login2/login2.component';
import {UserLogin3Component} from './passport/login3/login3.component';
import {CallbackComponent} from './callback/callback.component';
import {Exception403Component} from './exception/403.component';
import {Exception404Component} from './exception/404.component';
import {Exception500Component} from './exception/500.component';
import {ProAccountCenterComponent} from "./pro/account/center/center.component";
import {ProAccountCenterArticlesComponent} from "./pro/account/center/articles/articles.component";
import {ProAccountCenterProjectsComponent} from "./pro/account/center/projects/projects.component";
import {ProAccountCenterApplicationsComponent} from "./pro/account/center/applications/applications.component";
import {ProAccountSettingsComponent} from "./pro/account/settings/settings.component";
import {ProAccountSettingsBaseComponent} from "./pro/account/settings/base/base.component";
import {ProAccountSettingsSecurityComponent} from "./pro/account/settings/security/security.component";
import {ProAccountSettingsBindingComponent} from "./pro/account/settings/binding/binding.component";
import {ProAccountSettingsNotificationComponent} from "./pro/account/settings/notification/notification.component";

import {AccountCenterComponent} from "./account/center/center.component";
import {AccountCenterArticlesComponent} from "./account/center/articles/articles.component";
import {AccountCenterProjectsComponent} from "./account/center/projects/projects.component";
import {AccountCenterApplicationsComponent} from "./account/center/applications/applications.component";
import {AccountSettingsComponent} from "./account/settings/settings.component";
import {AccountSettingsBaseComponent} from "./account/settings/base/base.component";
import {AccountSettingsSecurityComponent} from "./account/settings/security/security.component";
import {AccountSettingsBindingComponent} from "./account/settings/binding/binding.component";
import {AccountSettingsNotificationComponent} from "./account/settings/notification/notification.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutProComponent,
        children: [
            {path: '', redirectTo: 'dashboard/analysis', pathMatch: 'full'},
            {path: 'dashboard', redirectTo: 'dashboard/analysis', pathMatch: 'full'},
            {path: 'dashboard/analysis', component: DashboardAnalysisComponent},
            {path: 'dashboard/monitor', component: DashboardMonitorComponent},
            {path: 'dashboard/workplace', component: DashboardWorkplaceComponent},
            {path: 'pro', loadChildren: './pro/pro.module#ProModule'},
            {path: 'sys', loadChildren: './sys/sys.module#SysModule'},
            {path: 'ec', loadChildren: './ec/ec.module#ECModule'},
            {path: 'map', loadChildren: './map/map.module#MapModule'},
            {path: 'chart', loadChildren: './chart/chart.module#ChartModule'},
            {path: 'other', loadChildren: './other/other.module#OtherModule'},
        ],
    },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            {
                path: 'login',
                component: UserLoginComponent,
                data: {title: '登录', titleI18n: 'app.login.login'},
            },
            {
                path: 'register',
                component: UserRegisterComponent,
                data: {title: '注册', titleI18n: 'app.register.register'},
            },
            {
                path: 'register-result',
                component: UserRegisterResultComponent,
                data: {title: '注册结果', titleI18n: 'app.register.register'},
            },
            {
                path: 'lock',
                component: UserLockComponent,
                data: {title: '锁屏', titleI18n: 'app.lock'},
            },
        ],
    },
    {
        path: 'account',
        children: [
            {
                path: 'center',
                component: AccountCenterComponent,
                children: [
                    {path: '', redirectTo: 'articles', pathMatch: 'full'},
                    {
                        path: 'articles',
                        component: AccountCenterArticlesComponent,
                        data: {titleI18n: 'pro-account-center'},
                    },
                    {
                        path: 'projects',
                        component: AccountCenterProjectsComponent,
                        data: {titleI18n: 'pro-account-center'},
                    },
                    {
                        path: 'applications',
                        component: AccountCenterApplicationsComponent,
                        data: {titleI18n: 'pro-account-center'},
                    },
                ],
            },
            {
                path: 'settings',
                component: AccountSettingsComponent,
                children: [
                    {path: '', redirectTo: 'base', pathMatch: 'full'},
                    {
                        path: 'base',
                        component: AccountSettingsBaseComponent,
                        data: {titleI18n: 'pro-account-settings'},
                    },
                    {
                        path: 'security',
                        component: AccountSettingsSecurityComponent,
                        data: {titleI18n: 'pro-account-settings'},
                    },
                    {
                        path: 'binding',
                        component: AccountSettingsBindingComponent,
                        data: {titleI18n: 'pro-account-settings'},
                    },
                    {
                        path: 'notification',
                        component: AccountSettingsNotificationComponent,
                        data: {titleI18n: 'pro-account-settings'},
                    },
                ],
            },
        ],
    },
    // 单页不包裹Layout
    {path: 'login2', component: UserLogin2Component},
    {path: 'login3', component: UserLogin3Component},
    {path: 'callback/:type', component: CallbackComponent},
    {path: '403', component: Exception403Component},
    {path: '404', component: Exception404Component},
    {path: '500', component: Exception500Component},
    {path: '**', redirectTo: 'dashboard'},
    /*{path: '', component: ''}*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: environment.useHash})],
    exports: [RouterModule],
})
export class RouteRoutingModule {
}
