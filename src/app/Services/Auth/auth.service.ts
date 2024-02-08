import { Injectable } from '@angular/core';
import {BehaviorSubject, first, Observable, switchMap, tap} from "rxjs";
import {ILoginResponseData} from "../../Interfaces/Auth/ilogin-response-data";
import {LocalStorageService} from "../General/local-storage.service";
import {HttpClient} from "@angular/common/http";
import {CsrfService} from "./csrf.service";

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

  constructor(private http: HttpClient, private csrfService: CsrfService) {

  }

  checkAuthentication() {
      return this.csrfService.getCsrfCookie().pipe(
      switchMap(() => {
        const csrfToken = this.csrfService.getCsrfCookieFromCookies();
        if (csrfToken !== null) {
          return this.http.get<{authenticated: boolean}>('api/user-authenticated', {
            headers: {
              'X-XSRF-TOKEN': csrfToken
            },
            withCredentials: true
          }).pipe(
            tap(response => {
              this.setAuthState(response.authenticated);
            }),
            first()
          );
        } else {
          throw new Error('CSRF token is null');
        }
      })
    );
  }

  setAuthState(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }
  setUserRoles(userRoles: string[]) {
    this.userRolesSubject.next(userRoles);
  }

  setUserPermissions(userPermissions: string[]) {
    this.userPermissionsSubject.next(userPermissions);
  }

  clearAuthState() {
    this.isAuthenticatedSubject.next(false);
    this.userRolesSubject.next([]);
    this.userPermissionsSubject.next([]);
  }
  setUserState(loginResponseData: ILoginResponseData) {
    this.setAuthState(true);
    this.setUserRoles(loginResponseData.user.roles);
    this.setUserPermissions(loginResponseData.user.permissions);
  }
}
