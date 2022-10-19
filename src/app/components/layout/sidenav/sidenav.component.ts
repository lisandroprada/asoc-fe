import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import data, { IMenu, IMenuItem } from 'src/app/constants/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output() toogleSideBarAction: EventEmitter<any> = new EventEmitter();
  @Input() subMenuClick: any;
  menuList: any = data;
  @Input() asideStatus: boolean = true;
  @Input() status: boolean = false;
  url: string = 'dashboard';

  showMenu: boolean = false;

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void {
    // this.menuService.getNewMenuStatus().subscribe((status) => {
    //   console.log(status);
    //   this.showMenu = status;
    // });

    // console.log(this.asideStatus);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.url.split('/')[2];
        this.url = url;
        console.log(url);
        return true;
      });
  }
  toogleSideBar(item: any) {
    this.toogleSideBarAction.emit(item);
    this.subMenuClick = item.text;
    console.log(item);
  }
}
