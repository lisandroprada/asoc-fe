import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  collapsed: boolean = false;
  itemActive: string = 'dashboard';
  showMenu: boolean = true;

  subMenuItems: any;

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getNewMenuStatus().subscribe((status) => {
      console.log(status);
      this.showMenu = status;
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.url.split('/')[2];
        console.log(event.url);
        return true;
      });
  }

  toggleSideBar(menuItems: any) {
    console.log(
      this.subMenuItems,
      menuItems,
      this.collapsed,
      this.menuService.menuState
    );

    this.subMenuItems = menuItems;

    // if (
    //   menuItems === 'header' &&
    //   this.subMenuItems.children &&
    //   this.collapsed === false
    // ) {
    //   this.collapsed = true;
    //   return;
    // }
    // console.log(this.subMenuItems === menuItems);
    // if (this.subMenuItems === menuItems && this.collapsed === true) {
    //   this.collapsed = false;
    //   return;
    // }

    if (!menuItems.children && this.collapsed === true) {
      console.log('1');
      this.collapsed = false;
      return;
    }

    if (menuItems.children && this.collapsed === true) {
      console.log('2');
      this.subMenuItems = menuItems;
      return;
    }

    if (!menuItems.children) return;

    if (this.collapsed === true) {
      menuItems = '';
    } else {
      this.subMenuItems = menuItems;
    }

    this.collapsed = !this.collapsed;
  }

  setClass(item: any) {
    this.itemActive = item.split('/')[2];
    console.log(this.itemActive);
    this.collapsed = false;
    this.menuService.setMenuStatus(false);
  }
}
