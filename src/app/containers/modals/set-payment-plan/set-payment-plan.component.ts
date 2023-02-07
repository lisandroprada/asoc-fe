import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCardLgImage } from '@angular/material/card';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BalanceService } from 'src/app/services/balance.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-set-payment-plan',
  templateUrl: './set-payment-plan.component.html',
  styles: [
    `
      .example-additional-selection {
        opacity: 0.75;
        font-size: 0.75em;
      }
    `,
  ],
})
export class SetPaymentPlanComponent implements OnInit {
  pplans: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private balanceService: BalanceService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.balanceService.getPaymentPlan().subscribe((res: any) => {
      this.pplans = res.data;
    });
  }

  paymentPlans = new FormControl('');

  ngOnInit(): void {}

  cancel() {
    this.dialog.closeAll();
  }

  submit() {
    console.log('enviado', this.data);
    this.balanceService
      .createIndividualPPlan(this.paymentPlans.value, this.data._id)
      .subscribe((result) => {
        this.commonService.callComponentMethod();
        this.openSnackBar('Plan de pagos cargados...', 'Volver');
        this.dialog.closeAll();
      });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}
