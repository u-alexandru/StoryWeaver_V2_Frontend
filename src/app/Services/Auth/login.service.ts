import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILogin} from "../../Interfaces/Auth/ilogin";
import {catchError, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {ILoginResponseData} from "../../Interfaces/Auth/ilogin-response-data";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router ) { }

  login(loginData: ILogin) {
    return this.http.post('api/login', loginData, {withCredentials: true})
      .pipe(
        tap((res) => {
          this.authService.setUserState(res as ILoginResponseData)
          this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
            console.log('isAuthenticated', isAuthenticated);
          })
          this.router.navigate(['/']);
        }),
        catchError((error: any) => {
          // Handle errors here (e.g., log, display error messages)
          this.authService.clearAuthState();
          throw error; // Rethrow the error for the calling code to handle
        })
      );
  }

  // logout
  logout() {
    return this.http.post('api/logout', {}, {withCredentials: true})
      .pipe(
        tap((res) => {
          this.authService.clearAuthState();
          this.router.navigate(['/']);
        }),
        catchError((error: any) => {
          // Handle errors here (e.g., log, display error messages)
          this.authService.clearAuthState();
          throw error; // Rethrow the error for the calling code to handle
        })
      );
  }
}
