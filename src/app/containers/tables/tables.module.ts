import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { MaterialModule } from 'src/app/components/material/material.module';

@NgModule({
  declarations: [BirthdaysComponent],
  imports: [CommonModule, MaterialModule],
  exports: [BirthdaysComponent],
})
export class TablesModule {}
