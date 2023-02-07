import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pplan',
})
export class PplanPipe implements PipeTransform {
  transform(value: [], ...args: unknown[]): unknown {
    if (value && value.length) {
      return true;
    } else return false;
  }
}
