import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { MasterAccount } from 'src/app/interfaces/IMasterAccount';
import { BalanceService } from 'src/app/services/balance.service';
import { CommonService } from 'src/app/services/common.service';
import { AddNewPaymentCComponent } from '../add-new-payment-c/add-new-payment-c.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-customer-balance',
  templateUrl: './customer-balance.component.html',
  styles: [
    `
      table {
        width: 100%;
      }
      th {
        padding-left: 5px;
      }
      td {
        padding-left: 5px;
      }
    `,
  ],
})
export class CustomerBalanceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize: number = 5;
  timer: any;

  displayedColumns: string[] = [
    'name',
    'description',
    'amount',
    'balance',
    'dueDate',
    'actions',
  ];

  dataSource: MasterAccount[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private balanceService: BalanceService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) {
    this.commonService.componentMethodCalled$.subscribe(() => {
      this.renderTable();
    });
  }

  openDialog(
    event: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data?: any
  ): void {
    if (event.action === 'addNewPaymentC') {
      this.dialog.open(AddNewPaymentCComponent, {
        // width: '640px',
        // height: '600px',
        maxHeight: '100vh',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
      });
    }
  }

  // renderTable() {
  //   this.balanceService
  //     .getMasterAccounts('dueDate', '', 0, 5, '', this.data._id)
  //     .subscribe((response: any) => {
  //       this.dataSource = response.data;
  //       console.log(this.dataSource);
  //     });
  // }

  renderTable() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.balanceService!.getMasterAccounts(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            '',
            this.data._id
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.results;
          return data.data;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.dataSource = data;
      });
  }

  addPayment(item: any) {
    console.log(item);
    const event = { action: 'addNewPaymentC' };
    this.openDialog(event, '300ms', '300ms', item);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.renderTable();
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;

    // console.log(this.tela);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.renderTable();
    }, 700);
  }
}
function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
