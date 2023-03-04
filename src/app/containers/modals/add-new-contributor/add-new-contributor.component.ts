import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { BalanceService } from 'src/app/services/balance.service';
import { CommonService } from 'src/app/services/common.service';
import { ContributorsService } from 'src/app/services/contributors.service';
import { SureComponent } from '../sure/sure.component';

@Component({
  selector: 'app-add-new-contributor',
  templateUrl: './add-new-contributor.component.html',
  styles: [],
})
export class AddNewContributorComponent implements OnInit {
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
    private contributorsService: ContributorsService
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
      this.contributorsService
        .updateOne(this.data._id, this.forma.value)
        .subscribe((res) => {
          console.log(res);
          this.commonService.callComponentMethod();
        });
    } else {
      this.contributorsService
        .addNewContributor(this.forma.value)
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
