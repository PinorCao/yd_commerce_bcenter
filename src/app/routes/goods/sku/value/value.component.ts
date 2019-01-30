import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {
  CreateOrUpdateAttributeInput,
  CreateOrUpdateAttributeValueInput,
  ProductAttributeServiceProxy,
} from '@shared/service-proxies/service-proxies';

const isAttrsExist = (name, attrs) => {
  if (attrs.length < 1) {
    return false;
  }
  let res = false;
  attrs.forEach(attr => {
    if (attr.name === name) {
      res = true;
    }
  });
  return res;
};


@Component({
  selector: 'app-goods-sku-attr-value',
  templateUrl: './value.component.html',
})

export class GoodsSkuAttrValueComponent implements OnInit {
  @Input() attributeId = 0;
  @Input() attrValues;
  @Output() valueChange = new EventEmitter();
  attrValue = new CreateOrUpdateAttributeValueInput({
    id: 0,
    attributeId: this.attributeId,
    displayOrder: 0,
    name: '',
  });

  constructor(private attributeSvc: ProductAttributeServiceProxy) {
  }

  ngOnInit() {
  }

  onChange(e) {
    this.attrValue = Object.assign(this.attrValue, {
      id: e.nzValue,
      attributeId: this.attributeId,
      name: e.nzLabel,
    });
    this.valueChange.emit(this.attrValue);
  }

  editValue(name) {
    this.attrValue = Object.assign(this.attrValue, {
      id: 0,
      attributeId: this.attributeId,
      name: name,
    });
    this.attributeSvc.createOrUpdateAttributeValue(this.attrValue).subscribe(res => {
      this.attrValue.id = res.id;
      this.valueChange.emit(this.attrValue);
    });
  }

  onBlur(target) {
    if (!target.value) {
      return false;
    }
    if (isAttrsExist(target.value, this.attrValues)) {
      return false;
    }
    this.editValue(target.value);
  }
}
