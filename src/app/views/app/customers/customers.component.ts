import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  catchError,
  merge,
  startWith,
  switchMap,
  of as observableOf,
  map,
} from 'rxjs';
import { AddNewCustomerComponent } from 'src/app/containers/modals/add-new-customer/add-new-customer.component';
import { CustomerData } from 'src/app/interfaces/ICustomer';
import { MenuItem } from 'src/app/interfaces/IMenuItem';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: [
    `
      .mat-form-field {
        font-size: 14px;
        width: 100%;
      }
      table {
        width: 100%;
      }
      button {
        margin-right: 8px;
      }
    `,
  ],
})
export class CustomersComponent implements AfterViewInit {
  menuItems: MenuItem[] = [{ name: 'Agregar Asocioado', icon: 'person_add' }];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize: number = 5;
  search: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'customer_ID',
    'name',
    'ci',
    'credencial',
    'codPolicial',
    'dateOfBird',
    'phone',
    'status',
    'since',
  ];

  data: CustomerData[] = [];

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) {
    this.commonService.componentMethodCalled$.subscribe(() => {
      this.renderTable();
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddNewCustomerComponent, {
      width: '640px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngAfterViewInit(): void {
    // this.exampleDatabase = this.customerService;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.renderTable();
  }
  renderTable() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.customerService!.getCustomers(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.search
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
          return data.data.data;
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
  applyFilter(event: any) {
    this.search = event;
    this.renderTable();
  }

  pageChanged(action: any) {}
}
