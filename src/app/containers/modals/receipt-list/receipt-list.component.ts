import { BalanceService } from 'src/app/services/balance.service';
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
import { merge, startWith, switchMap, catchError, map } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
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
export class ReceiptListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize: number = 5;
  timer: any;

  displayedColumns: string[] = [
    'type',
    'date',
    'description',
    'amount',
    'actions',
  ];
  dataSource: [] = [];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private balanceService: BalanceService,
    private commonService: CommonService
  ) {
    this.commonService.componentMethodCalled$.subscribe(() => {
      this.renderTable();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.renderTable();
  }

  print(item: any) {}

  cancel() {
    this.dialog.closeAll();
  }

  renderTable() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.balanceService!.getReceipt(
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
