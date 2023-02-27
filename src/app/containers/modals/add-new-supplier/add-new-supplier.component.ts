import { SuppliersService } from './../../../services/suppliers.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BalanceService } from 'src/app/services/balance.service';
import { CommonService } from 'src/app/services/common.service';
import { SureComponent } from '../sure/sure.component';

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styles: [],
})
export class AddNewSupplierComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  forma: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private balanceService: BalanceService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private suppliersService: SuppliersService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.forma = this.fb.group({
      name: ['', Validators.required],
      email: [],
      // photo: { type: String, default: 'default-user-avatar.png' },
      phone: [],
      address: [],
      // active: [],
    });
  }

  formChanged() {}

  checkCI(event: any) {}

  cancel() {
    this.openDialog('300ms', '300ms', SureComponent);
  }

  submit() {
    if (this.forma.invalid) {
      this.openSnackBar('Debe completar todos los campos requeridos', 'Volver');
      return;
    }

    if (this.data._id) {
      this.suppliersService
        .updateOne(this.data._id, this.forma.value)
        .subscribe((res) => {
          console.log(res);
          this.commonService.callComponentMethod();
        });
    } else {
      this.suppliersService
        .addNewSupplier(this.forma.value)
        .subscribe((res) => {
          console.log(res);
          this.commonService.callComponentMethod();
        });
    }
    this.dialog.closeAll();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    component: any,
    data?: any,
    dirty?: boolean
  ): void {
    if (this.forma.dirty || dirty) {
      const dialogRef = this.dialog.open(component, {
        // width: '340px',
        // minHeight: '300px',
        // height: '80%',
        enterAnimationDuration,
        exitAnimationDuration,
        data,
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
}
