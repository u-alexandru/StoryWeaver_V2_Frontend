import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  getCsrfCookie() {
    return this.http.get('sanctum/csrf-cookie', {withCredentials: true});
  }

  getCsrfCookieFromCookies() {
    const cookies = this.document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0].trim() === 'XSRF-TOKEN') {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }
}
