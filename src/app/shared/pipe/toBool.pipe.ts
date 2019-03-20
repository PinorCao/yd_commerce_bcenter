import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toBool',
  pure: false
})

@Injectable()
export class ToBoolPipe implements PipeTransform {
  transform(value) {
    return value === 'true' ? true : false;
  }
}

