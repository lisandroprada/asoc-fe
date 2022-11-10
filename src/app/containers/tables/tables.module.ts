import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { PipesModuleModule } from 'src/app/pipes/pipes-module.module';

@NgModule({
  declarations: [BirthdaysComponent],
  imports: [CommonModule, MaterialModule, PipesModuleModule],
  exports: [BirthdaysComponent],
})
export class TablesModule {}
