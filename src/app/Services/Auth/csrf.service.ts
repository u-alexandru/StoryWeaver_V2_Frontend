import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { DOCUMENT } from '@angular/common';
import {SsrCookieService} from "ngx-cookie-service-ssr";

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private http: HttpClient, private cookieService: SsrCookieService) { }

  getCsrfCookie() {
    return this.http.get('sanctum/csrf-cookie', {withCredentials: true});
  }

  getCsrfCookieFromCookies() {
    return this.cookieService.check('XSRF-TOKEN') ? this.cookieService.get('XSRF-TOKEN') : null;
  }
}
