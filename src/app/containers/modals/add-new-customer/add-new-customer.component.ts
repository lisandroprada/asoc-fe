import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Status } from 'src/app/interfaces/IStatus';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SureComponent } from '../sure/sure.component';
import { ExistsTrueComponent } from '../exists-true/exists-true.component';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styles: [
    `
      td {
        padding-left: 5px;
      }
    `,
  ],
})
export class AddNewCustomerComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
  ) {
    this.createForm();
  }
  forma: FormGroup;
  wasFormChanged: Boolean = false;

  status: Status[] = [
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'Retirado', viewValue: 'Retirado' },
    { value: 'Por retirar', viewValue: 'Por retirar' },
  ];

  createForm() {
    this.forma = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      ci: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      city: [],
      state: [],
      phone: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.email],
      dateOfBird: ['', Validators.required],
      since: ['', Validators.required],
    });
  }

  loadForm(data: any) {
    this.forma.reset({
      name: data.name,
      ci: data.ci,
      city: data.city,
      state: data.state,
      phone: data.phone,
      status: data.status,
      email: data.email,
      dateOfBird: data.dateOfBird,
      since: data.since,
    });
  }

  ngOnInit(): void {}

  formChanged() {
    this.wasFormChanged = true;
  }

  submit() {
    if (this.forma.invalid) {
      this.openSnackBar('Debe completar todos los campos requeridos', 'Volver');
      return;
    }
    this.customerService
      .createCustomer(this.forma.value)
      .subscribe((response: any) => {
        this.commonService.callComponentMethod();
      });
    this.dialog.closeAll();
  }

  cancel() {
    this.openDialog('300ms', '300ms', SureComponent);
  }

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

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }

  checkCI(event: any) {
    this.customerService
      .getCustomers('', '', 0, 10, event.target.value)
      .subscribe((response: any) => {
        if (response.results === 1) {
          this.openDialog('300ms', '300ms', ExistsTrueComponent);
          this.loadForm(response.data.data[0]);
        }
      });
  }
}
