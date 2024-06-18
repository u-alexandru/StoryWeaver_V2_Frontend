import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher, MAT_DATE_LOCALE,
  provideNativeDateAdapter,
  ShowOnDirtyErrorStateMatcher
} from "@angular/material/core";
import {
  HTTP_INTERCEPTORS, HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi
} from "@angular/common/http";
import {csrfInterceptor} from "./Interceptors/Auth/csrf.interceptor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";

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
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    provideNativeDateAdapter(),
    DatePipe,
  ]
};
