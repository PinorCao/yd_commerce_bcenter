import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// delon
import {AlainThemeModule} from '@delon/theme';
import {DelonABCModule} from '@delon/abc';
import {DelonChartModule} from '@delon/chart';
import {DelonACLModule} from '@delon/acl';
import {DelonFormModule} from '@delon/form';
// i18n
import {TranslateModule} from '@ngx-translate/core';

// #region third libs
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SortablejsModule} from 'angular-sortablejs';
import {NgxImageGalleryModule} from 'ngx-image-gallery';
import {MouseFocusDirective} from '@shared/components/mouse-focus/mouse-focus.directive';
import {StatusLabelComponent} from '@shared/components/status-label/status-label.component';
/*import {EditorModule} from '@tinymce/tinymce-angular';*/

const THIRDMODULES = [
  NgZorroAntdModule,
  SortablejsModule,
  NgxImageGalleryModule
];
// #endregion

// #region your componets & directives
import {LangsComponent} from './components/langs/langs.component';
import {EditorComponent} from './components/editor/editor.component';
import {ImgComponent} from './components/img/img.component';
import {ImgDirective} from './components/img/img.directive';
import {DelayDirective} from './components/delay/delay.directive';
import {MasonryDirective} from './components/masonry/masonry.directive';
import {ScrollbarDirective} from './components/scrollbar/scrollbar.directive';
import {FileManagerComponent} from './components/file-manager/file-manager.component';
import {PRO_SHARED_COMPONENTS} from '../layout/pro';
import {AvatarComponent} from '@shared/components/avatar/avatar.component';
import {AvatarsComponent} from '@shared/components/avatars/avatars.component';
import {FeatureComponent} from '@shared/components/feature/feature.component';

const COMPONENTS_ENTRY = [
  LangsComponent,
  ImgComponent,
  FileManagerComponent,
  AvatarComponent,
  AvatarsComponent,
  FeatureComponent,
  StatusLabelComponent
];
const COMPONENTS = [
  EditorComponent,
  ...COMPONENTS_ENTRY,
  ...PRO_SHARED_COMPONENTS
];
const DIRECTIVES = [ImgDirective, DelayDirective, MasonryDirective, ScrollbarDirective, MouseFocusDirective];

const PIPES = [UploadFilePipe, ToBoolPipe];

// #endregion

// pipes

import {CNCurrencyPipe} from '@delon/theme';
import {UploadFilePipe} from '@shared/pipe/uploadFile.pipe';
import {ToBoolPipe} from '@shared/pipe/toBool.pipe';

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
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
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
    ...PIPES
  ],
  providers: [UploadFilePipe, CNCurrencyPipe]
})
export class SharedModule {
}
