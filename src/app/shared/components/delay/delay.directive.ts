import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { InputNumber } from '@delon/util';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[delay]',
  exportAs: 'delayComp'
})
export class DelayDirective implements AfterViewInit, OnDestroy {
  private data$: Subscription;

  @ContentChild(NgModel)
  private readonly ngModel: NgModel;

  @Input('delay')
  @InputNumber()
  delay = 500;

  @Output()
  delayChange = new EventEmitter<any>();

  ngAfterViewInit(): void {
    if (this.ngModel == null) {
      throw new Error(`Muse be specify ngModel direcitve`);
    }

    this.data$ = this.ngModel.valueChanges
      .pipe(
        debounceTime(this.delay),
        distinctUntilChanged(),
      )
      .subscribe(res => this.delayChange.emit(res));
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }
}
