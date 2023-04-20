import { Pipe, PipeTransform } from '@angular/core';

import { format } from 'date-fns-tz';

@Pipe({
  name: 'cumpleanio',
})
export class CumpleanioPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    const fecha = value;
    const fechaNacimiento = new Date(Date.parse(fecha.replace('Z', '')));
    const ajusteHorario = fechaNacimiento.getTimezoneOffset() / 60;
    fechaNacimiento.setMinutes(
      fechaNacimiento.getMinutes() + ajusteHorario * 60
    );

    const hoy = new Date();
    const cumpleañosActual = new Date(
      hoy.getFullYear(),
      fechaNacimiento.getMonth(),
      fechaNacimiento.getDate()
    );

    if (cumpleañosActual > hoy) {
      cumpleañosActual.setFullYear(cumpleañosActual.getFullYear() - 1);
    }
    return cumpleañosActual.toLocaleDateString();
  }
}
