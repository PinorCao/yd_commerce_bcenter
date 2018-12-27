import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { SortablejsModule } from 'angular-sortablejs';
import { NgxImageGalleryModule } from 'ngx-image-gallery';

const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule,
  SortablejsModule,
  NgxImageGalleryModule,
];
// #endregion

// #region your componets & directives
import { LangsComponent } from './components/langs/langs.component';
import { EditorComponent } from './components/editor/editor.component';
import { ImgComponent } from './components/img/img.component';
import { ImgDirective } from './components/img/img.directive';
import { DelayDirective } from './components/delay/delay.directive';
import { MasonryDirective } from './components/masonry/masonry.directive';
import { ScrollbarDirective } from './components/scrollbar/scrollbar.directive';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { PRO_SHARED_COMPONENTS } from '../layout/pro';
const COMPONENTS_ENTRY = [
  LangsComponent,
  ImgComponent,
  FileManagerComponent
];
const COMPONENTS = [
  EditorComponent,
  ...COMPONENTS_ENTRY,
  ...PRO_SHARED_COMPONENTS
];
const DIRECTIVES = [ ImgDirective, DelayDirective, MasonryDirective, ScrollbarDirective ];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: COMPONENTS_ENTRY,
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
