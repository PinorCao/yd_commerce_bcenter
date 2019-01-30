import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {
  CreateOrUpdateAttributeInput,
  CreateOrUpdateAttributeValueInput,
  ProductAttributeMappingDto,
  ProductAttributeServiceProxy,
} from '@shared/service-proxies/service-proxies';

const isAttrsExist = (name, attrs) => {
  let res = false;
  attrs.forEach(attr => {
    if (attr.name === name) {
      res = true;
    }
  });
  return res;
};

@Component({
  selector: 'app-goods-sku-attr',
  templateUrl: './attr.component.html',
})

export class GoodsSkuAttrComponent implements OnInit {
  @Input() attributes = [];
  @Output() attrChange = new EventEmitter();

  attribute = new CreateOrUpdateAttributeInput({
    id: 0,
    displayOrder: 0,
    name: '',
  });
  _attrValues;
  attrValues: CreateOrUpdateAttributeValueInput[] = [
    new CreateOrUpdateAttributeValueInput({
      id: 0,
      attributeId: this.attribute.id,
      displayOrder: 0,
      name: '',
    }),
  ];

  constructor(private attributeSvc: ProductAttributeServiceProxy) {
  }

  ngOnInit() {
  }

  onChange(item) {
    this.attribute.id = item.nzValue;
    this.attribute.name = item.nzLabel;
    this.attrValues = [
      new CreateOrUpdateAttributeValueInput({
        id: 0,
        attributeId: this.attribute.id,
        displayOrder: 0,
        name: '',
      }),
    ];
    this.getValues();
  }

  getValues() {
    this.attributeSvc.getAttributeValues(this.attribute.id).subscribe(res => {
      this._attrValues = res;
    });
  }

  valueChange(e, i) {
    this.attrValues[i].id = e.id;
    this.attrValues[i].attributeId = e.attributeId;
    this.attrValues[i].name = e.name;
    this.getValues();
    this.attrChange.emit({
      id: this.attribute.id,
      displayOrder: 0,
      name: this.attribute.name,
      values: (() => {
        const attrValues = [];
        this.attrValues.map((item) => {
          attrValues.push({ pictureId: 0, displayOrder: 0, id: item.id, name: item.name });
        });
        return attrValues;
      })(),
    });
  }

  addValue() {
    this.attrValues.push(new CreateOrUpdateAttributeValueInput({
      id: 0,
      attributeId: this.attribute.id,
      displayOrder: 0,
      name: '',
    }));
  }

  editAttribute(name) {
    if (!name) {
      return false;
    }
    this.attribute.id = 0;
    this.attribute.name = name;
    this.attributeSvc.createOrUpdateAttribute(this.attribute).subscribe(res => {
      this.attribute.id = res.id;
      this.attrChange.emit({
        id: this.attribute.id,
        displayOrder: 0,
        name: this.attribute.name,
        values: (() => {
          const attrValues = [];
          this.attrValues.map((item) => {
            attrValues.push({ pictureId: 0, displayOrder: 0, id: item.id, name: item.name });
          });
          return attrValues;
        })(),
      });
    });
  }

  onBlur(target) {
    if (!target.value) {
      return false;
    }
    if (isAttrsExist(target.value, this.attributes)) {
      return false;
    }
    this.editAttribute(target.value);
  }
}
