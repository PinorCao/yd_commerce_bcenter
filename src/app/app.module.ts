import {NgModule, Injector, LOCALE_ID, APP_INITIALIZER} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as _ from 'lodash';

// #region default language
// 参考：https://ng-alain.com/docs/i18n
import {default as ngLang} from '@angular/common/locales/zh';
import {NZ_I18N, zh_CN as zorroLang} from 'ng-zorro-antd';
import {DELON_LOCALE, zh_CN as delonLang} from '@delon/theme';
import {JWTInterceptor} from '@delon/auth';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  delon: delonLang
};
// register angular
import {registerLocaleData} from '@angular/common';

registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  {provide: LOCALE_ID, useValue: LANG.abbr},
  {provide: NZ_I18N, useValue: LANG.zorro},
  {provide: DELON_LOCALE, useValue: LANG.delon}
];
// #endregion

// #region i18n services
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MenuService, ALAIN_I18N_TOKEN} from '@delon/theme';
import {I18NService} from '@core/i18n/i18n.service';

// 加载i18n语言文件
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

const I18NSERVICE_MODULES = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: I18nHttpLoaderFactory,
      deps: [HttpClient]
    }
  })
];

const I18NSERVICE_PROVIDES = [
  {provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false}
];

// #endregion

// #region global third module

const GLOBAL_THIRD_MODULES = [];

// #endregion

// #region JSON Schema form (using @delon/form)
import {JsonSchemaModule} from '@shared/json-schema/json-schema.module';

const FORM_MODULES = [JsonSchemaModule];
// #endregion

// #region Http Interceptorsa
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SimpleInterceptor} from '@delon/auth';
import {DefaultInterceptor} from '@core/net/default.interceptor';

import {AbpHttpInterceptor} from '@abp/abpHttpInterceptor';

const INTERCEPTOR_PROVIDES = [
  /*{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },*/
  {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true}
  /*{ provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl }*/
];
// #endregion

// #region Startup Service
import {StartupService} from '@core/startup/startup.service';
import {AppPreBootstrap} from '../AppPreBootstrap';
import {AppSessionService} from '@shared/session/app-session.service';
import {AbpSharedModule} from '@shared/abpshared.module';
import {ServiceProxyModule} from '@shared/service-proxies/service-proxy.module';

export function StartupServiceFactory(
  injector: Injector,
  startupService: StartupService
): Function {
  return () =>
    startupService
      .load().then(() => {

      // 初始化消息类通知
      /*const abpMessage = injector.get(AbpMessage);
      abpMessage.init();*/

      // 初始化abp
      return new Promise<boolean>((resolve, reject) => {
        AppPreBootstrap.run(() => {
          abp.event.trigger('abp.dynamicScriptsInitialized');

          const appSessionService: AppSessionService = injector.get(
            AppSessionService
          );

          appSessionService.init().then(
            result => {
              resolve(result);
            },
            err => {
              reject(err);
            }
          );
        });
      });
    })
      .then(() => {

        /**
         * 根据权限修改菜单是否显示
         * @param menus
         */
        console.log('abp is running');

        function checkMenuPermission(menus) {
          _.forEach(menus, (item) => {

            item.hide = item.permissions && !abp.auth.isGranted(item.permissions);

            if (item.children != undefined && item.children.length > 0) {
              checkMenuPermission(item.children);
            }
          });
        }


        // 验证菜单权限
        var menuService: MenuService = injector.get(MenuService);
        var menus = menuService.menus;

        checkMenuPermission(menus);

        // 需要重新设置菜单
        menuService.clear();
        menuService.add(menus);

      });
}

const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [Injector, StartupService],
    multi: true
  }
];
// #endregion

import {DelonModule} from './delon.module';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {AppComponent} from './app.component';
import {RoutesModule} from './routes/routes.module';
import {LayoutModule} from './layout/layout.module';

import {AbpModule} from 'abp-ng2-module/dist';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DelonModule.forRoot(),
    ServiceProxyModule,
    AbpModule,
    AbpSharedModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    ...I18NSERVICE_MODULES,
    ...GLOBAL_THIRD_MODULES,
    ...FORM_MODULES
  ],
  providers: [
    ...LANG_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
    ...I18NSERVICE_PROVIDES,
    ...APPINIT_PROVIDES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
