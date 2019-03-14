import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {ShipmentRoutingModule} from './shipment-routing.module';

import {ShipmentListComponent} from './list/list.component';

const COMPONENTS = [
  ShipmentListComponent
];

@NgModule({
  imports: [SharedModule, ShipmentRoutingModule],
  declarations: [...COMPONENTS]
})
export class ShipmentModule {
}
