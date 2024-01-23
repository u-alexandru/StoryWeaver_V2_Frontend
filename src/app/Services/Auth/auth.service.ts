import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ILoginResponseData} from "../../Interfaces/Auth/ilogin-response-data";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userRolesSubject = new BehaviorSubject<string[]>([]);
  private userPermissionsSubject = new BehaviorSubject<string[]>([]);

  private readonly isAuthenticatedKey = 'isAuthenticated';

  // Expose observables to components
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  userRoles$: Observable<string[]> = this.userRolesSubject.asObservable();
  userPermissions$: Observable<string[]> = this.userPermissionsSubject.asObservable();

  constructor() {
    this.isAuthenticatedSubject.next(localStorage.getItem(this.isAuthenticatedKey) === 'true');
  }

  setAuthState(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
    localStorage.setItem(this.isAuthenticatedKey, isAuthenticated ? 'true' : 'false');
  }
  setUserRoles(userRoles: string[]) {
    this.userRolesSubject.next(userRoles);
  }

  setUserPermissions(userPermissions: string[]) {
    this.userPermissionsSubject.next(userPermissions);
  }

  clearAuthState() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem(this.isAuthenticatedKey);
    this.userRolesSubject.next([]);
    this.userPermissionsSubject.next([]);
  }
  setUserState(loginResponseData: ILoginResponseData) {
    this.setAuthState(true);
    this.setUserRoles(loginResponseData.user.roles);
    this.setUserPermissions(loginResponseData.user.permissions);
  }
}
