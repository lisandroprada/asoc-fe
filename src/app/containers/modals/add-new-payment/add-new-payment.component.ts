import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BalanceService } from 'src/app/services/balance.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-new-payment',
  templateUrl: './add-new-payment.component.html',
  styles: [],
})
export class AddNewPaymentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private balanceService: BalanceService,
    private commonService: CommonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.balanceService.processBatch().subscribe((response) => {
      console.log(response);
      this.dialog.closeAll();
    });
  }
}
