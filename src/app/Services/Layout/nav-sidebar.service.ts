import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavSidebarService {
 // sidebar open/close observable
  private _sidebarOpen = false;
  private _sidebarOpen$ = new BehaviorSubject<boolean>(this._sidebarOpen);
  public sidebarOpen$ = this._sidebarOpen$.asObservable();
  constructor() { }

  // toggle sidebar open/close
  toggleSidebar() {
    this._sidebarOpen = !this._sidebarOpen;
    this._sidebarOpen$.next(this._sidebarOpen);
  }
}
