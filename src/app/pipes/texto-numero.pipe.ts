import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textoNumero',
})
export class TextoNumeroPipe implements PipeTransform {
  transform(numero: number): string {
    console.log(numero);
    const unidades = [
      '',
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
      'nueve',
    ];
    const especiales = [
      'diez',
      'once',
      'doce',
      'trece',
      'catorce',
      'quince',
      'dieciséis',
      'diecisiete',
      'dieciocho',
      'diecinueve',
    ];
    const decenas = [
      '',
      '',
      'veinte',
      'treinta',
      'cuarenta',
      'cincuenta',
      'sesenta',
      'setenta',
      'ochenta',
      'noventa',
    ];
    const miles = [
      '',
      'mil',
      'millones',
      'mil millones',
      'billones',
      'mil billones',
      'trillones',
      'mil trillones',
      'cuatrillones',
      'mil cuatrillones',
      'quintillones',
      'mil quintillones',
      'sextillones',
      'mil sextillones',
      'septillones',
      'mil septillones',
      'octillones',
      'mil octillones',
      'nonillones',
      'mil nonillones',
      'decillones',
      'mil decillones',
    ];

    if (numero === 0) {
      return 'cero';
    }

    let texto = '';
    let i = 0;
    while (numero > 0) {
      const grupo = numero % 1000;
      if (grupo > 0) {
        let parte = '';
        if (grupo === 1 && i === 1) {
          parte = 'un';
        } else {
          parte = this.convertirGrupo(grupo, unidades, especiales, decenas);
        }
        if (i > 0) {
          parte += ' ' + miles[i];
        }
        if (texto.length > 0) {
          texto = parte + ', ' + texto;
        } else {
          texto = parte;
        }
      }
      numero = Math.floor(numero / 1000);
      i++;
    }

    return texto;
  }

  private convertirGrupo(
    grupo: number,
    unidades: string[],
    especiales: string[],
    decenas: string[]
  ): string {
    let texto = '';
    if (grupo >= 100) {
      const centenas = Math.floor(grupo / 100);
      texto += unidades[centenas] + 'cientos ';
      grupo = grupo % 100;
    }
    if (grupo >= 10 && grupo <= 19) {
      texto += especiales[grupo - 10];
    } else {
      const decena = Math.floor(grupo / 10);
      const unidad = grupo % 10;
      if (decena > 0) {
        texto += decenas[decena];
        if (unidad > 0) {
          texto += ' y ';
        }
      }
      if (unidad > 0 || grupo === 0) {
        texto += unidades[unidad];
      }
    }
    return texto;
  }
}
