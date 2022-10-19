import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Status } from 'src/app/interfaces/IStatus';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SureComponent } from '../sure/sure.component';

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
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private commonService: CommonService
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
    });
  }

  ngOnInit(): void {}

  formChanged() {
    this.wasFormChanged = true;
  }

  submit() {
    console.log(this.forma.value);
    this.customerService
      .createCustomer(this.forma.value)
      .subscribe((response: any) => {
        console.log(response);
        this.commonService.callComponentMethod();
      });
    this.dialog.closeAll();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    console.log(this.wasFormChanged);
    if (this.forma.dirty) {
      const dialogRef = this.dialog.open(SureComponent, {
        width: '340px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    } else {
      this.dialog.closeAll();
    }
  }
}
