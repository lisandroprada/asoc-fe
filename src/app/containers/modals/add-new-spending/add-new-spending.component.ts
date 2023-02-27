import { SuppliersService } from './../../../services/suppliers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-new-spending',
  templateUrl: './add-new-spending.component.html',
  styles: [
    `
      td {
        padding-left: 5px;
      }
      .mat-dialog-content {
        max-height: unset;
      }
    `,
  ],
})
export class AddNewSpendingComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  conceptos: any[];
  typeOfVoucher = [
    { value: 'Factura', viewValue: 'Factura', disabled: false },
    { value: 'Recibo', viewValue: 'Recibo', disabled: false },
    { value: 'Autofactura', viewValue: 'AutoFactura', disabled: false },
  ];
  suppliers: any[];

  forma: FormGroup;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private commonService: CommonService,
    private suppliersService: SuppliersService
  ) {
    this.expenseService.getExpenses().subscribe((expenses: any) => {
      this.conceptos = expenses.data;
      console.log(this.conceptos);
    });
    this.suppliersService.getSuppliers().subscribe((suppliers: any) => {
      this.suppliers = suppliers.data;
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    this.expenseService
      .addEntry(this.forma.value)
      .subscribe((expenses: any) => {
        console.log(expenses);
        this.commonService.callComponentMethod();
      });
    this.dialog.closeAll();
  }

  createForm() {
    this.forma = this.fb.group({
      Id_Account: [],
      description: [],
      additionalDetail: [],
      amount: [],
      date: [],
      supplier: [],
      voucher: [],
      type: [],
      // method: [],
    });
  }

  formChanged() {}
}
