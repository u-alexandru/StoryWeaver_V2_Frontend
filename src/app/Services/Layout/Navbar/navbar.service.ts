import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
// declare behaviour subject for isLoading bool
  isLoadingSubject$ = new BehaviorSubject<boolean>(false);

  // expose observable to components
  isLoading$ = this.isLoadingSubject$.asObservable();
  constructor() { }

  // set loading state
  setLoadingState(loading: boolean) {
    this.isLoadingSubject$.next(loading);
  }

  // get loading state

  getLoadingState() {
    return this.isLoadingSubject$.getValue();
  }

}
