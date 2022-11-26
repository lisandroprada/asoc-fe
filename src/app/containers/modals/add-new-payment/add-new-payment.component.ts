import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const forma = {
      date: new Date(),
      target: this.data.target,
      amount: this.data.amount,
      type: 'Recibo',
      accountId: this.data._id,
    };
    this.balanceService.createReceipt(forma).subscribe((response: any) => {
      console.log(response);
      this.commonService.callComponentMethod();
    });
  }
}
