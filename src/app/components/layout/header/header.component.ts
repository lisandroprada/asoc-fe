import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private menuService: MenuService,
    private router: Router,
    private authService: AuthService
  ) {}

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

  userProfile = this.authService.currentUser;

  ngOnInit(): void {
    if (window.innerWidth < 750) {
      this.menuService.setMenuStatus(false);
    }
  }

  toogleSideBar() {
    this.toogleSideBarAction.emit('header');
  }

  showMenu() {
    if (window.innerWidth >= 750) {
      this.menuService.setMenuStatus(true);
      console.log(this.menuService.menuState);
      return;
    }

    var menuStatus: boolean = this.menuService.menuState;
    console.log('showMenu', menuStatus, !menuStatus);

    this.menuService.setMenuStatus(menuStatus);
    // this.menuService.setMenuStatus(!menuStatus);
    // menuStatus = !menuStatus;
    this.menuService.menuState = !menuStatus;
  }

  headerMenu() {
    this.dropDown_visible = !this.dropDown_visible;
    console.log(this.dropDown_visible);
  }

  signOut() {
    this.router.navigate(['/auth'], { replaceUrl: true });

    this.authService.googleLogout();
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.disableAutoSelect();
    };
  }
}
