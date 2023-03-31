import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-export-customers',
  templateUrl: './export-customers.component.html',
  styles: [
    `
      section {
        display: table;
      }

      .example-label {
        display: table-cell;
        font-size: 14px;
        margin-left: 8px;
        min-width: 120px;
      }

      .example-button-row {
        display: table-cell;
        max-width: 600px;
      }

      .example-button-row .mat-mdc-button-base {
        margin: 8px 8px 8px 0;
      }

      .example-flex-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .example-button-container {
        display: flex;
        justify-content: center;
        width: 120px;
      }
    `,
  ],
})
export class ExportCustomersComponent implements OnInit {
  data: any;

  constructor(private customersService: CustomerService) {}

  ngOnInit(): void {}

  onSubmit(tipo: string) {
    this.customersService.getCustomersReport().subscribe((data: any) => {
      this.data = data.data;
      if (tipo === 'retirados') {
        this.data = this.data.filter((item: any) => item.status === 'Retirado');
      }
      this.exportToExcel();
    });
  }

  exportToExcel(): void {
    // id, código policial, nombre y apellido, documento, estado, ciudad
    const data = this.data.map((row: any) => {
      return {
        column1: row.customer_ID,
        column2: row.codPolicial,
        column3: row.name,
        column4: row.ci,
        column5: row.state,
        column6: row.city,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Cambiar los títulos de las columnas
    worksheet['A1'].v = 'Id';
    worksheet['B1'].v = 'Código Policial';
    worksheet['C1'].v = 'Nombre';
    worksheet['D1'].v = 'Documento';
    worksheet['E1'].v = 'Estado';
    worksheet['F1'].v = 'Ciudad';

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
