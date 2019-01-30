import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { GoodsRoutingModule } from './goods-routing.module';

import { GoodsListComponent } from './list/list.component';
import { GoodsAddComponent } from './add/add.component';
import { GoodsEditComponent } from './edit/edit.component';

import { GoodsCategoryListComponent } from './category/list/list.component';
import { GoodsCategoryAddComponent } from './category/add/add.component';
import { GoodsCategoryEditComponent } from './category/edit/edit.component';

import { GoodsEditImgComponent } from './img/img.component';
import { GoodsSkuAttrComponent } from './sku/attr.component';
import { GoodsSkuAttrValueComponent } from './sku/value/value.component';

const COMPONENTS = [
  GoodsListComponent,
  GoodsAddComponent,
  GoodsEditComponent,
  GoodsCategoryListComponent,
  GoodsCategoryAddComponent,
  GoodsCategoryEditComponent,
];

const COMPONENTS_NOROUNT = [
  GoodsEditImgComponent,
  GoodsSkuAttrComponent,
  GoodsSkuAttrValueComponent,
];

@NgModule({
  imports: [SharedModule, GoodsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class GoodsModule {
}
