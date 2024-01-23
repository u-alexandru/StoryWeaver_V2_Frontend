import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private http: HttpClient) { }

  getCsrfCookie() {
    return this.http.get('sanctum/csrf-cookie', {withCredentials: true});
  }

  getCsrfCookieFromCookies() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0].trim() === 'XSRF-TOKEN') {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }
}
