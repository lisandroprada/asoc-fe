import { BalanceService } from 'src/app/services/balance.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account-plans',
  templateUrl: './account-plans.component.html',
  styles: [
    `
      table {
        width: 100%;
        overflow-x: auto;
      }

      .mat-form-field {
        font-size: 14px;
        width: 100%;
      }
    `,
  ],
})
export class AccountPlansComponent implements OnInit {
  displayedColumns: string[] = [
    'startDate',
    'name',
    // 'frequency',
    'amount',
    // 'periods',
  ];
  dataSource = new MatTableDataSource();
  data: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private balanceService: BalanceService) {
    this.balanceService.getPaymentPlan().subscribe((data: any) => {
      console.log({ data });
      this.data = data;
      this.dataSource = new MatTableDataSource(data.data);
    });
  }

  ngOnInit(): void {}
}
