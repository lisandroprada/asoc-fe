import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerData } from 'src/app/interfaces/ICustomer';
import { CustomerService } from 'src/app/services/customer.service';

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
  displayedColumns: string[] = [
    'customer_ID',
    'name',
    'ci',
    'dateOfBird',
    'phone',
    'status',
    'since',
  ];

  dataSource: MatTableDataSource<CustomerData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private customerService: CustomerService) {
    this.customerService.getStatistics().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.birthdays);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
