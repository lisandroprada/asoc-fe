import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-receipt',
  templateUrl: './pdf-receipt.component.html',
  styleUrls: ['./pdf-receipt.component.scss'],
})
export class PdfReceiptComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit(): void {}

  exportPdf() {
    console.log('exportar');
    let content = document.getElementById('receipt');
    console.log(content);
    if (content) {
      html2canvas(content).then((canvas) => {
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('l', 'cm', 'a4');
        let margins = 1.5; // Margen en centímetros
        let pageWidth = 29.7;
        let pageHeight = 21.0;
        let imageWidth = pageWidth - margins * 2;
        let imageHeight = pageHeight - margins * 2;
        pdf.addImage(
          contentDataURL,
          'PNG',
          margins,
          margins,
          imageWidth,
          imageHeight
        );
        pdf.save('Recibo.pdf');
      });
    }
  }
}
