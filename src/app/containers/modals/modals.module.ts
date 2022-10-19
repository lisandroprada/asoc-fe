import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { SureComponent } from './sure/sure.component';

@NgModule({
  declarations: [AddNewCustomerComponent, SuccessComponent, SureComponent],
  imports: [CommonModule, MaterialModule, MatDialogModule, ReactiveFormsModule],
  exports: [AddNewCustomerComponent],
})
export class ModalsModule {}
