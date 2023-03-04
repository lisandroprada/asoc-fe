import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { IncomeService } from 'src/app/services/income.service';
import { ContributorsService } from 'src/app/services/contributors.service';

@Component({
  selector: 'app-add-new-income',
  templateUrl: './add-new-income.component.html',
  styles: [],
})
export class AddNewIncomeComponent implements OnInit {
  forma: FormGroup;
  conceptos: any;
  typeOfVoucher: any;
  contributors: any;

  constructor(
    private incomeServices: IncomeService,
    private fb: FormBuilder,
    private commonService: CommonService,
    public dialog: MatDialog,
    public contributorsService: ContributorsService
  ) {
    this.incomeServices.getincomes().subscribe((income: any) => {
      this.conceptos = income.data;
    });
    this.contributorsService
      .getContributors()
      .subscribe((contributors: any) => {
        this.contributors = contributors.data;
      });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forma = this.fb.group({
      Id_Account: [],
      description: [],
      additionalDetail: [],
      amount: [],
      date: [],
      contributor: [],
      voucher: [],
      // type: [],
      // method: [],
    });
  }
  onSubmit() {
    this.incomeServices.addEntry(this.forma.value).subscribe((incomes: any) => {
      console.log(incomes);
      this.commonService.callComponentMethod();
    });
    this.dialog.closeAll();
  }

  formChanged() {}
}
