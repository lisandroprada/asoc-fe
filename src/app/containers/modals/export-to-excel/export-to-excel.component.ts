import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-export-to-excel',
  templateUrl: './export-to-excel.component.html',
  styles: [],
})
export class ExportToExcelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exporterService: ExporterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.data, 'asociados');
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }
}
