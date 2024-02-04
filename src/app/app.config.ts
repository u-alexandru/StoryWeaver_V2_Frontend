import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {
  HTTP_INTERCEPTORS, HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi
} from "@angular/common/http";
import {csrfInterceptor} from "./Interceptors/Auth/csrf.interceptor";
import {AuthService} from "./Services/Auth/auth.service";
import {Observable} from "rxjs";
import {CsrfService} from "./Services/Auth/csrf.service";

function initializeUserState(authService: AuthService): () => Observable<any> {
  return () => authService.checkAuthentication();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    provideHttpClient(
      withInterceptors([csrfInterceptor]),
      withFetch()
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserState,
      multi: true,
      deps: [AuthService, CsrfService]
    }
  ]
};
