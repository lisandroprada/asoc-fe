import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthday',
})
export class BirthdayPipe implements PipeTransform {
  transform(value: Date): unknown {
    const birthday = new Date(value);
    const actualDate = new Date();

    const actualYear = actualDate.getFullYear();

    birthday.setFullYear(actualYear);

    return birthday.toLocaleDateString('es-AR');
  }
}
