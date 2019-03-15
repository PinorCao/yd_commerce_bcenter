import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {ShipmentRoutingModule} from './shipment-routing.module';

import {ShipmentListComponent} from './list/list.component';
import {ShipmentSupportListComponent} from './support/list/list.component';

const COMPONENTS = [
  ShipmentListComponent,
  ShipmentSupportListComponent
];

@NgModule({
  imports: [SharedModule, ShipmentRoutingModule],
  declarations: [...COMPONENTS]
})
export class ShipmentModule {
}
