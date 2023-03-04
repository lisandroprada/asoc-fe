import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { PipesModuleModule } from 'src/app/pipes/pipes-module.module';
import { AccountPlansComponent } from './account-plans/account-plans.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ContributorsComponent } from './contributors/contributors.component';

@NgModule({
  declarations: [BirthdaysComponent, AccountPlansComponent, ExpensesComponent, SuppliersComponent, ContributorsComponent],
  imports: [CommonModule, MaterialModule, PipesModuleModule],
  exports: [BirthdaysComponent, AccountPlansComponent, ExpensesComponent, SuppliersComponent, ContributorsComponent],
})
export class TablesModule {}
