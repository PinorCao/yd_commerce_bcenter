import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { GoodsService } from '../goods.service';
import {
  CreateOrUpdateProductInput,
  ProductAttributeServiceProxy,
  ProductAttributeMappingDto,
  CategoryServiceProxy,
  AttributeCombinationDto,
  ProductAttributeValueDto,
} from '@shared/service-proxies/service-proxies';
import { deepCopy } from '@delon/util';

let results = [];
let result = [];

const doExchange = (arr, depth) => {
  for (let i = 0; i < arr[depth].length; i++) {
    result[depth] = arr[depth][i];
    if (depth !== arr.length - 1) {
      doExchange(arr, depth + 1);
    } else {
      results.push(result.join('|'));
    }
  }
};

const test = (arr) => {
  results = [];
  result = [];
  doExchange(arr, 0);
};

@Component({
  selector: 'app-goods-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
})
export class GoodsAddComponent implements OnInit {

  loading = false;

  categories;
  attributes; // 可选属性

  product = new CreateOrUpdateProductInput({
    id: 0,
    name: '',
    shortDescription: '',
    fullDescription: '',
    sku: '',
    thirdPartySku: '',
    stockQuantity: undefined,
    notifyAdminForQuantityBelow: undefined,
    price: undefined,
    goodCost: undefined,
    weight: undefined,
    length: undefined,
    width: undefined,
    height: undefined,
    categories: undefined,
    pictures: undefined,
    attributes: [
      new ProductAttributeMappingDto({
        id: 0,
        displayOrder: 0,
        values: [],
      }),
    ],
    attributeCombinations: [],
  });

  constructor(
    private router: Router,
    private msgSvc: NzMessageService,
    private categorySvc: CategoryServiceProxy,
    private attributeSvc: ProductAttributeServiceProxy) {
    categorySvc.getCategorySelectList().subscribe(res => {
      this.categories = res;
    });
    this.getAttributes();
  }

  ngOnInit() {
  }

  getAttributes() {
    this.attributeSvc.getAttributes().subscribe(res => {
      this.attributes = res;
    });
  }

  addAttr() {
    this.product.attributes.push(new ProductAttributeMappingDto({
      id: 0,
      displayOrder: 0,
      values: [],
    }));
  }

  createSku() {
    const attributes = this.product.attributes.filter(item => item.values.length > 0);
    const combinations: AttributeCombinationDto[] = [];
    let values = [];
    const inFn = (index) => {

      for (let i = 0; i < attributes[index].values.length; i++) {
        const item: ProductAttributeMappingDto = new ProductAttributeMappingDto({
          id: attributes[index].id,
          displayOrder: 0,
          values: [attributes[index].values[i]],
        });
        item['name'] = attributes[index]['name'];
        values[index] = item;
        if (index === attributes.length - 1) {
          combinations.push(new AttributeCombinationDto({
            id: 0,
            attributes: deepCopy(values),
            stockQuantity: 0,
            sku: '',
            thirdPartySku: '',
            overriddenPrice: 0,
            overriddenGoodCost: 0,
          }));
          continue;
        }
        if (i === attributes[index].values.length - 1 && index === attributes.length - 1) {
          return;
        } else {
          inFn(index + 1);
        }
      }
    };
    if (attributes.length > 0) {
      inFn(0);
    }
    this.product.attributeCombinations = combinations;
    console.log(this.product.attributeCombinations);
  }

  /*createSku() {
    const attributes = this.product.attributes.filter(item => item.values.length > 0);
    const combinations: AttributeCombinationDto[] = [];
    let values: ProductAttributeValueDto[] = [];
    const inFn = (index) => {

      for (let i = 0; i < attributes[index].values.length; i++) {
        const item: ProductAttributeValueDto = attributes[index].values[i];
        console.log(item);
        values[index] = item;
        if (index === attributes.length - 1) {
          const _values = deepCopy(values);
          combinations.push(_values);
          continue;
        }
        if (i === attributes[index].values.length - 1 && index === attributes.length - 1) {
          return;
        } else {
          inFn(index + 1);
        }
      }
    };
    if (attributes.length > 0) {
      inFn(0);
    }
    this.combinations = combinations;
  }*/

  attrChange(e, i) {
    this.product.attributes[i].id = e.id;
    this.product.attributes[i].values = e.values;
    this.product.attributes[i]['name'] = e.name;
    this.getAttributes();
    this.createSku();
  }

  save() {
    console.log(this.product);
    if (this.loading) {
      return false;
    }
  }

  cancel() {
  }
}
