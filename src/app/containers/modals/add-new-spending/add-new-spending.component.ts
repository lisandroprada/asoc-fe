import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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

  conceptos = [
    { value: 'varios', viewValue: 'Gastos Varios', disabled: false },
    { value: 'regalos', viewValue: 'Regalos' },
    { value: 'servicios', viewValue: 'Servicios', disabled: false },
    {
      value: 'representacion',
      viewValue: 'Gastos de representación',
      disabled: false,
    },
    { value: 'varios2', viewValue: 'Otros gastos', disabled: false },
    { value: 'varios3', viewValue: 'Otro tipo de gasto', disabled: false },
  ];

  forma: FormGroup;
  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    this.dialog.closeAll();
  }

  createForm() {
    this.forma = this.fb.group({
      name: ['', Validators.required],
      startDate: [],
      concepto: [],
      detalle: [],
      amount: [],
    });
  }

  formChanged() {}
}
