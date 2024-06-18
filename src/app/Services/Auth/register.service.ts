import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {NavbarService} from "../Layout/Navbar/navbar.service";
import {IRegister} from "../../Interfaces/Auth/iregister";
import {catchError, tap} from "rxjs";
import {ILoginResponseData} from "../../Interfaces/Auth/ilogin-response-data";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private navbarService: NavbarService ) { }

  register(registerData: IRegister) {
    this.navbarService.setLoadingState(true);
    return this.http.post('api/register', registerData, {withCredentials: true})
      .pipe(
        tap((res) => {
          this.navbarService.setLoadingState(false);
        }),
        catchError((error: any) => {
          this.navbarService.setLoadingState(false);
          throw error; // Rethrow the error for the calling code to handle
        })
      );
  }
}
