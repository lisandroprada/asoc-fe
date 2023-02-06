import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { PipesModuleModule } from 'src/app/pipes/pipes-module.module';
import { AccountPlansComponent } from './account-plans/account-plans.component';

@NgModule({
  declarations: [BirthdaysComponent, AccountPlansComponent],
  imports: [CommonModule, MaterialModule, PipesModuleModule],
  exports: [BirthdaysComponent, AccountPlansComponent],
})
export class TablesModule {}
