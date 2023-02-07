import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdayPipe } from './birthday.pipe';
import { PplanPipe } from './pplan.pipe';

@NgModule({
  declarations: [BirthdayPipe, PplanPipe],
  imports: [CommonModule],
  exports: [BirthdayPipe, PplanPipe],
})
export class PipesModuleModule {}
