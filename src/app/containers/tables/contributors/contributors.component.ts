import { AddNewContributorComponent } from './../../modals/add-new-contributor/add-new-contributor.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContributorsService } from 'src/app/services/contributors.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
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
export class ContributorsComponent implements OnInit {
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
    private contributorsService: ContributorsService,
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
    this.contributorsService.getContributors().subscribe((contributor: any) => {
      this.dataSource = new MatTableDataSource(contributor.data);
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
    this.dialog.open(AddNewContributorComponent, {
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
