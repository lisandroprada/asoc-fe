import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdayPipe } from './birthday.pipe';

@NgModule({
  declarations: [BirthdayPipe],
  imports: [CommonModule],
  exports: [BirthdayPipe],
})
export class PipesModuleModule {}
