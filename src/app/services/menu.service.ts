import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  @HostListener('window:resize', ['$event'])
  public menuState: boolean = true;
  public headerData: any;

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

  setHeaderData(data: any) {
    this.headerData = data;
  }
}
