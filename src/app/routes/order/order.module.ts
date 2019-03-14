import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {OrderRoutingModule} from './order-routing.module';

import {OrderListComponent} from './list/list.component';
import {OrderEditComponent} from './edit/edit.component';

import {OrderListViewComponent} from './list/view.component';
import {OrderListMemoComponent} from './list/memo.component';

const COMPONENTS = [
  OrderListComponent,
  OrderEditComponent
];

const COMPONENTS_NOROUNT = [
  OrderListViewComponent,
  OrderListMemoComponent
];

@NgModule({
  imports: [SharedModule, OrderRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class OrderModule {
}
