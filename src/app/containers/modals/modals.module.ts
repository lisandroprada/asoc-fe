import { ExportCustomersComponent } from './export-customers/export-customers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { SureComponent } from './sure/sure.component';
import { ExistsTrueComponent } from './exists-true/exists-true.component';
import { ExportToExcelComponent } from './export-to-excel/export-to-excel.component';
import { AddNewPaymentComponent } from './add-new-payment/add-new-payment.component';
import { AddNewPaymentPlanComponent } from './add-new-payment-plan/add-new-payment-plan.component';
import { NgxMaskModule } from 'ngx-mask';
import { CustomerBalanceComponent } from './customer-balance/customer-balance.component';
import { AddNewSpendingComponent } from './add-new-spending/add-new-spending.component';
import { AddNewPaymentCComponent } from './add-new-payment-c/add-new-payment-c.component';
import { SetPaymentPlanComponent } from './set-payment-plan/set-payment-plan.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { AddNewSupplierComponent } from './add-new-supplier/add-new-supplier.component';
import { AddNewIncomeComponent } from './add-new-income/add-new-income.component';
import { AddNewContributorComponent } from './add-new-contributor/add-new-contributor.component';
import { PdfReceiptComponent } from './pdf-receipt/pdf-receipt.component';
import { PipesModuleModule } from '../../pipes/pipes-module.module';

@NgModule({
  declarations: [
    AddNewCustomerComponent,
    SuccessComponent,
    SureComponent,
    ExistsTrueComponent,
    ExportToExcelComponent,
    AddNewPaymentComponent,
    AddNewPaymentPlanComponent,
    CustomerBalanceComponent,
    AddNewSpendingComponent,
    AddNewPaymentCComponent,
    SetPaymentPlanComponent,
    ReceiptListComponent,
    AddNewSupplierComponent,
    AddNewIncomeComponent,
    AddNewContributorComponent,
    ExportCustomersComponent,
    PdfReceiptComponent,
  ],
  exports: [
    AddNewCustomerComponent,
    ExistsTrueComponent,
    ExportToExcelComponent,
    AddNewPaymentComponent,
    AddNewPaymentPlanComponent,
    SetPaymentPlanComponent,
    ReceiptListComponent,
    AddNewSupplierComponent,
    AddNewIncomeComponent,
    AddNewContributorComponent,
    ExportCustomersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    PipesModuleModule,
  ],
})
export class ModalsModule {}
