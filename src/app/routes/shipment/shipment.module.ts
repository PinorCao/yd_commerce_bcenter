import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {ShipmentRoutingModule} from './shipment-routing.module';

import {ShipmentListComponent} from './list/list.component';
import {ShipmentSupportListComponent} from './support/list/list.component';
import {ShipmentListImportComponent} from './list/import.component';
import {ShipmentEditComponent} from './edit/edit.component';

const COMPONENTS = [
  ShipmentListComponent,
  ShipmentEditComponent,
  ShipmentSupportListComponent
];

const COMPONENTS_NOROUNT = [
  ShipmentListImportComponent
];

@NgModule({
  imports: [SharedModule, ShipmentRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class ShipmentModule {
}
