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
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { PdfReceiptComponent } from '../pdf-receipt/pdf-receipt.component';

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
  pageSize: number = 6;
  timer: any;

  displayedColumns: string[] = [
    'type',
    'date',
    'description',
    'amount',
    'actions',
  ];
  dataSource: [] = [];
  dataReport: any;

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

  ngOnInit(): void {
    this.balanceService
      .getReceiptsNoOptions(this.data._id)
      .subscribe((data: any) => {
        this.dataReport = data.data;
        console.log(this.dataReport);
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.renderTable();
  }

  print(item: any) {}

  saveAsPdf(item: any) {
    this.dialog.open(PdfReceiptComponent, {
      data: item,
    });
  }

  cancel() {
    this.dialog.closeAll();
  }

  renderTable() {
    console.log(this.sort.active);
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

  exportToExcel(): void {
    // Tipo	Fecha	Descripción	Monto

    const data = this.dataReport.map((row: any) => {
      return {
        column1: row.type,
        column2: row.date,
        column3: row.description,
        column4: row.amount,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(data);

    const dateStyle = { numFmt: 'dd/mm/yyyy' };

    // Cambiar los títulos de las columnas
    worksheet['A1'].v = 'Tipo de Comprobante';
    worksheet['B1'].v = 'Fecha';
    worksheet['C1'].v = 'Descripción';
    worksheet['D1'].v = 'Monto';

    worksheet['B1'].s = dateStyle;

    data.forEach((row: any, index: any) => {
      const cell = XLSX.utils.encode_cell({ r: index + 1, c: 1 }); // Obtener la celda de fecha
      worksheet[cell].s = dateStyle; // Aplicar el estilo a la celda de fecha
    });

    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'miarchivo');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + '.xlsx'
    );
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
