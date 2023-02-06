import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      .mat-dialog-content {
        max-height: unset;
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
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  forma: FormGroup;
  wasFormChanged: Boolean = false;

  status: Status[] = [
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'Retirado', viewValue: 'Retirado' },
  ];

  createForm() {
    if (!this.data) {
      this.data = {};
    }
    this.forma = this.fb.group({
      name: [
        this.data.name,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      ci: [
        this.data.ci,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      credencial: [this.data.credencial],
      codPolicial: [this.data.codPolicial],
      city: [this.data.city],
      state: [this.data.state],
      phone: [this.data.phone, Validators.required],
      status: [this.data.status, Validators.required],
      email: [this.data.email, Validators.email],
      dateOfBird: [this.data.dateOfBird, Validators.required],
      since: [this.data.since, Validators.required],
    });
  }

  loadForm(data: any) {
    this.forma.reset({
      name: data.name,
      ci: data.ci,
      credencial: data.credencial,
      codPolicial: data.codPolicial,
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
    if (this.data._id) {
      this.customerService
        .updateOne(this.data._id, this.forma.value)
        .subscribe((data) => {
          this.commonService.callComponentMethod();
        });
    } else {
      this.customerService
        .createCustomer(this.forma.value)
        .subscribe((response: any) => {
          this.commonService.callComponentMethod();
        });
    }

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
          this.data = response.data.data[0];
          this.loadForm(this.data);
        }
      });
  }
}
