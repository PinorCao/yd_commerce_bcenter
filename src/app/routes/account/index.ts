import {AccountCenterComponent} from "./center/center.component";
import {AccountCenterArticlesComponent} from "./center/articles/articles.component";
import {AccountCenterApplicationsComponent} from "./center/applications/applications.component";
import {AccountCenterProjectsComponent} from "./center/projects/projects.component";

import {AccountSettingsComponent} from "./settings/settings.component";
import {AccountSettingsBaseComponent} from "./settings/base/base.component";
import {AccountSettingsBindingComponent} from "./settings/binding/binding.component";
import {AccountSettingsNotificationComponent} from "./settings/notification/notification.component";
import {AccountSettingsSecurityComponent} from "./settings/security/security.component";

export const ACCOUNT_PAGES = [
    AccountCenterComponent,
    AccountCenterArticlesComponent,
    AccountCenterApplicationsComponent,
    AccountCenterProjectsComponent,
    AccountSettingsComponent,
    AccountSettingsBaseComponent,
    AccountSettingsBindingComponent,
    AccountSettingsNotificationComponent,
    AccountSettingsSecurityComponent
];
