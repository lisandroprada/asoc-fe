import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdayPipe } from './birthday.pipe';
import { PplanPipe } from './pplan.pipe';
import { CumpleanioPipe } from './cumpleanio.pipe';

@NgModule({
  declarations: [BirthdayPipe, PplanPipe, CumpleanioPipe],
  imports: [CommonModule],
  exports: [BirthdayPipe, PplanPipe, CumpleanioPipe],
})
export class PipesModuleModule {}
