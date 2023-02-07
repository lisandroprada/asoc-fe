import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BalanceService } from 'src/app/services/balance.service';
import { CommonService } from 'src/app/services/common.service';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-payment-c',
  templateUrl: './add-new-payment-c.component.html',
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
export class AddNewPaymentCComponent implements OnInit {
  forma: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private balanceService: BalanceService,
    private commonService: CommonService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.createForm();
    console.log('data', this.data);
  }

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      amount: [
        this.data.balance,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.data.balance),
        ],
      ],
      date: new Date(),
    });
  }

  formChanged() {}

  onSubmit() {
    if (this.forma.invalid) {
      this.openSnackBar('Debe completar todos los campos requeridos', 'Volver');
      return;
    }

    const formulario = {
      ...this.forma.value,
      _id: this.data._id,
      customerId: this.data.target,
    };

    this.balanceService.createReceipt(formulario).subscribe((result) => {
      console.log(result);
    });

    this.dialog.closeAll();

    console.log(this.forma.value);
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}
