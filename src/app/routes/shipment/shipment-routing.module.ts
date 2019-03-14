import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ShipmentListComponent} from './list/list.component';

const routes: Routes = [
  {
    path: 'list', component: ShipmentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule {
}
