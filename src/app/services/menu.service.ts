import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  public menuState: boolean = false;

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
