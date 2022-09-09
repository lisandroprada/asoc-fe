import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toogleSideBarAction: EventEmitter<any> = new EventEmitter();

  dropDown_visible: boolean = false;
  smallScreen: boolean = false;

  constructor(private menuService: MenuService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(window.innerWidth);
    if (window.innerWidth <= 750) {
      this.menuService.setMenuStatus(false);
      this.menuService.menuState = true;
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }

    // this.checkCanShowSearchAsOverlay(window.innerWidth);
    // this.checkPhoneScreenSize(window.innerWidth);
  }

  ngOnInit(): void {}

  toogleSideBar() {
    this.toogleSideBarAction.emit('header');
  }

  showMenu() {
    var menuStatus: boolean = this.menuService.menuState;

    this.menuService.setMenuStatus(menuStatus);
    menuStatus = !menuStatus;
    this.menuService.menuState = menuStatus;
  }

  headerMenu() {
    this.dropDown_visible = !this.dropDown_visible;
    console.log(this.dropDown_visible);
  }
}
