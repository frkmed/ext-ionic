import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToIterable'
})
@Injectable()
export class MapToIterable implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let result: Array<any> = [];

    if (value.entries) {
      for (var [key, value] of value.entries()) {
        result.push({ key, value });
      }
    } else {
      for (let key in value) {
        result.push({ key, value: value[key] });
      }
    }

    return result;
  }
}
