import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import data from 'src/app/constants/menu';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() menuItems: any;
  @Input() menuVisible: boolean = false;

  @Output() addNewItem: EventEmitter<any> = new EventEmitter();

  breadcrumb: any;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    if (!this.menuService.headerData) {
      this.menuService.headerData = data[0];
    }
    console.log(this.menuService.headerData);
    this.breadcrumb = this.menuService.headerData;
  }

  onAddNewItem(): void {
    this.addNewItem.emit(null);
  }
}
