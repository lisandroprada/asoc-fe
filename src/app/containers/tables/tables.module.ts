import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { PipesModuleModule } from 'src/app/pipes/pipes-module.module';
import { AccountPlansComponent } from './account-plans/account-plans.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

@NgModule({
  declarations: [BirthdaysComponent, AccountPlansComponent, ExpensesComponent, SuppliersComponent],
  imports: [CommonModule, MaterialModule, PipesModuleModule],
  exports: [BirthdaysComponent, AccountPlansComponent, ExpensesComponent, SuppliersComponent],
})
export class TablesModule {}
