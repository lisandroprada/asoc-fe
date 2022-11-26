import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BalanceService } from 'src/app/services/balance.service';
import { SureComponent } from '../sure/sure.component';

@Component({
  selector: 'app-add-new-payment-plan',
  templateUrl: './add-new-payment-plan.component.html',
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
export class AddNewPaymentPlanComponent implements OnInit {
  frequencies = [
    { value: 'day', viewValue: 'Diario', disabled: true },
    { value: 'month', viewValue: 'Mensual' },
    { value: 'quarterly', viewValue: 'Trimestral', disabled: true },
    { value: 'four-month', viewValue: 'Cuatrimestral', disabled: true },
    { value: 'semester', viewValue: 'Semestral', disabled: true },
    { value: 'annual', viewValue: 'Anual', disabled: true },
  ];

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private balanceService: BalanceService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      name: ['', Validators.required],
      startDate: [],
      frequency: [],
      periods: [],
      amount: [],
    });
  }

  formChanged() {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    component: any
  ): void {
    if (this.forma.dirty) {
      const dialogRef = this.dialog.open(component, {
        width: '340px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    } else {
      this.dialog.closeAll();
    }
  }

  submit() {
    this.balanceService
      .createPaymentPlan(this.forma.value)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  cancel() {
    this.openDialog('300ms', '300ms', SureComponent);
  }
}
