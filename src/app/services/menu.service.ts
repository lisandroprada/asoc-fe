import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {
    console.log(window.innerWidth, window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])

  // onResize(event: any) {
  //   console.log(window.innerWidth);
  // }
  public menuState: boolean = true;

  private menuStatus = new BehaviorSubject<any>({
    state: true,
  });

  setMenuStatus(status: any) {
    this.menuStatus.next(status);
    this.menuState = status;
  }

  getNewMenuStatus() {
    return this.menuStatus.asObservable();
  }
}
