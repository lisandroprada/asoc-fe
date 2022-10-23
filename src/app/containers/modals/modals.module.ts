import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { SureComponent } from './sure/sure.component';
import { ExistsTrueComponent } from './exists-true/exists-true.component';

@NgModule({
  declarations: [AddNewCustomerComponent, SuccessComponent, SureComponent, ExistsTrueComponent],
  imports: [CommonModule, MaterialModule, MatDialogModule, ReactiveFormsModule],
  exports: [AddNewCustomerComponent, ExistsTrueComponent],
})
export class ModalsModule {}
