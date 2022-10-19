import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-resumen',
  templateUrl: './resumen.component.html',
  styles: [],
})
export class ResumenComponent implements OnInit {
  @Input() title: any;
  @Input() value: any;
  @Input() icon: any;
  @Input() color: any;

  constructor() {}

  ngOnInit(): void {}
}
