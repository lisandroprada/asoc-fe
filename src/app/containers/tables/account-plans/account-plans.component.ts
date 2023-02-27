import { BalanceService } from 'src/app/services/balance.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPaymentPlanComponent } from '../../modals/add-new-payment-plan/add-new-payment-plan.component';

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
      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      mat-icon {
        margin-bottom: 4px;
        margin-left: 20px;
        margin-right: 10px;
      }
      mat-icon:hover {
        cursor: pointer;
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
  constructor(
    private balanceService: BalanceService,
    private commonService: CommonService,
    public dialog: MatDialog
  ) {
    this.commonService.componentMethodCalled$.subscribe(() => {
      this.renderTable();
    });
    this.renderTable();
  }

  renderTable() {
    this.balanceService.getPaymentPlan().subscribe((data: any) => {
      console.log({ data });
      this.data = data;
      this.dataSource = new MatTableDataSource(data.data);
    });
  }

  ngOnInit(): void {}

  addAccount() {
    this.dialog.open(AddNewPaymentPlanComponent, {
      // width: '640px',
      // height: '600px',
      minWidth: '340px',
      maxHeight: '100vh',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: '',
      disableClose: true,
    });
  }
}
