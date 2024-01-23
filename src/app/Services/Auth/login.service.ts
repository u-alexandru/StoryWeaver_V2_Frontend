import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILogin} from "../../Interfaces/Auth/ilogin";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(loginData: ILogin) {
    return this.http.post('api/login', loginData, {withCredentials: true})
      .pipe(
        catchError((error: any) => {
          // Handle errors here (e.g., log, display error messages)
          console.error('Login failed:', error);
          throw error; // Rethrow the error for the calling code to handle
        })
      );
  }
}
