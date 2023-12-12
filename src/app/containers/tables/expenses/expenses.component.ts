import { ExpenseService } from 'src/app/services/expense.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
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
export class ExpensesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    // '_id',
    'additionalDetail',
    'date',
    'amount',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private expenseService: ExpenseService,
    private commonService: CommonService
  ) {
    // Assign the data to the data source for the table to render
    this.commonService.componentMethodCalled$.subscribe(() => {
      this.renderTable();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.renderTable();
  }

  renderTable() {
    this.expenseService.getExpensesEntries().subscribe((expenses: any) => {
      console.log(expenses.data, expenses.status, expenses.results);
      this.dataSource = new MatTableDataSource(expenses.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
