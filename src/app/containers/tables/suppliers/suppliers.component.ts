import { AddNewSupplierComponent } from './../../modals/add-new-supplier/add-new-supplier.component';
import { SuppliersService } from './../../../services/suppliers.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
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
export class SuppliersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    // '_id',
    'name',
    'phone',
    'email',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private suppliersService: SuppliersService,
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
    this.suppliersService.getSuppliers().subscribe((expenses: any) => {
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

  addSupplier() {
    this.dialog.open(AddNewSupplierComponent, {
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
