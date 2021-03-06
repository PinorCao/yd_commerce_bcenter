import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrderListComponent} from './list/list.component';
import {OrderEditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: 'list', component: OrderListComponent
  },
  {
    path: 'edit/:id', component: OrderEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
