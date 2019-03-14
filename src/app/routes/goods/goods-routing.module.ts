import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GoodsListComponent} from './list/list.component';
import {GoodsEditComponent} from './edit/edit.component';

import {GoodsCategoryListComponent} from './category/list/list.component';
import {GoodsCategoryAddComponent} from './category/add/add.component';
import {GoodsCategoryEditComponent} from './category/edit/edit.component';


const routes: Routes = [
  {
    path: 'list', component: GoodsListComponent
  },
  {
    path: 'edit/:id', component: GoodsEditComponent
  },
  {
    path: 'category/list', component: GoodsCategoryListComponent
  },
  {
    path: 'category/add', component: GoodsCategoryAddComponent
  },
  {
    path: 'category/edit/:id', component: GoodsCategoryEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule {
}
