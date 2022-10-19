import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() menuItems: any;
  @Input() menuVisible: boolean = false;

  @Output() addNewItem: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddNewItem(): void {
    console.log('action');
    this.addNewItem.emit(null);
  }
}
