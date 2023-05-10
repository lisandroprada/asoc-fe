import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdayPipe } from './birthday.pipe';
import { PplanPipe } from './pplan.pipe';
import { CumpleanioPipe } from './cumpleanio.pipe';
import { TextoNumeroPipe } from './texto-numero.pipe';
import { DatosClientePipe } from './datos-cliente.pipe';

@NgModule({
  declarations: [BirthdayPipe, PplanPipe, CumpleanioPipe, TextoNumeroPipe, DatosClientePipe],
  imports: [CommonModule],
  exports: [BirthdayPipe, PplanPipe, CumpleanioPipe, TextoNumeroPipe, DatosClientePipe],
})
export class PipesModuleModule {}
