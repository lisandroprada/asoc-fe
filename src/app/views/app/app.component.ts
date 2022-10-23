import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements AfterViewInit {
  collapsed: boolean = false;
  itemActive: string = 'dashboard';
  showMenu: boolean = true;

  subMenuItems: any;

  constructor(private router: Router, private menuService: MenuService) {}
  @HostListener('window:resize', ['$event'])
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.menuService.getNewMenuStatus().subscribe((status) => {
        this.showMenu = status;
      });
    }, 0);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.url.split('/')[2];
        return true;
      });
  }

  toggleSideBar(menuItems: any) {
    this.subMenuItems = menuItems;

    // if (
    //   menuItems === 'header' &&
    //   this.subMenuItems.children &&
    //   this.collapsed === false
    // ) {
    //   this.collapsed = true;
    //   return;
    // }
    // if (this.subMenuItems === menuItems && this.collapsed === true) {
    //   this.collapsed = false;
    //   return;
    // }

    if (!menuItems.children && this.collapsed === true) {
      this.collapsed = false;
      return;
    }

    if (menuItems.children && this.collapsed === true) {
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
    this.collapsed = false;
    this.menuService.setMenuStatus(false);
    this.menuService.menuState = true;
  }
}
