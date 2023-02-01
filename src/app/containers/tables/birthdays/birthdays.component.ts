import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerData } from 'src/app/interfaces/ICustomer';
import { CustomerService } from 'src/app/services/customer.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
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
export class BirthdaysComponent implements OnInit {
  columns: string[] = ['name', 'birthday'];
  columnsExt: string[] = ['name', 'birthday', 'phone', 'status'];

  displayedColumns: string[] = this.columnsExt;

  dataSource: MatTableDataSource<CustomerData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private menuService: MenuService
  ) {
    this.customerService.getStatistics().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.actualBirthDays);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= 750) {
      this.displayedColumns = this.columns;
    } else {
      this.displayedColumns = this.columnsExt;
    }
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
