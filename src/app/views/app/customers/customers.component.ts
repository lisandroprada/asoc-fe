import { ReceiptListComponent } from './../../../containers/modals/receipt-list/receipt-list.component';
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
import { CustomerBalanceComponent } from 'src/app/containers/modals/customer-balance/customer-balance.component';
import { ExportToExcelComponent } from 'src/app/containers/modals/export-to-excel/export-to-excel.component';
import { SetPaymentPlanComponent } from 'src/app/containers/modals/set-payment-plan/set-payment-plan.component';
import { CustomerData } from 'src/app/interfaces/ICustomer';
import { MenuItem } from 'src/app/interfaces/IMenuItem';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ExportCustomersComponent } from 'src/app/containers/modals/export-customers/export-customers.component';

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
      .mat-dialog-content {
        max-height: unset;
      }
      .mat-header-cell {
        text-align: center;
      }
    `,
  ],
})
export class CustomersComponent implements AfterViewInit {
  timer: any;
  menuItems: MenuItem[] = [
    {
      name: 'Agregar Asocioado',
      icon: 'person_add',
      action: 'addAssociate',
      disabled: false,
    },
    {
      name: 'Exportar a Excel',
      icon: 'table_chart',
      action: 'exportToExcel',
      disabled: false,
    },
    {
      name: 'Exportar a Asociados',
      icon: 'table_chart',
      action: 'exportCustomers',
      disabled: false,
    },
  ];

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
    'paymentPlans',
    'since',
    'actions',
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
    event: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data?: any
  ): void {
    if (event.action === 'addAssociate') {
      this.dialog.open(AddNewCustomerComponent, {
        maxHeight: '100vh',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
      });
    }
    if (event.action === 'exportCustomers') {
      this.dialog.open(ExportCustomersComponent, {
        maxHeight: '100vh',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
      });
    }

    if (event.action === 'exportToExcel') {
      this.dialog.open(ExportToExcelComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: this.data,
      });
    }
    if (event.action === 'customerBalance') {
      this.dialog.open(CustomerBalanceComponent, {
        minWidth: '800px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
      });
    }
    if (event.action === 'setPaymentPlan') {
      this.dialog.open(SetPaymentPlanComponent, {
        // minWidth: '800px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
      });
    }
    if (event.action === 'receiptList') {
      this.dialog.open(ReceiptListComponent, {
        // minWidth: '800px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
      });
    }
  }

  editCustomer(item: any) {
    const event = { action: 'addAssociate' };
    this.openDialog(event, '300ms', '300ms', item);
  }

  customerBalance(item: any) {
    const event = { action: 'customerBalance' };
    this.openDialog(event, '300ms', '300ms', item);
  }

  setPaymentPlan(item: any) {
    const event = { action: 'setPaymentPlan' };
    this.openDialog(event, '300ms', '300ms', item);
  }

  receiptList(item: any) {
    const event = { action: 'receiptList' };
    this.openDialog(event, '300ms', '300ms', item);
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
          return data.data;
        })
      )
      .subscribe((data) => {
        // console.log(data);
        this.data = data;
      });
  }
  applyFilter(event: any) {
    console.log(event);
    this.search = event;
    this.paginator.pageIndex = 0;

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
