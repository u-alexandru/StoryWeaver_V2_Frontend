import { Routes } from '@angular/router';
import {LoginComponent} from "./User/Auth/login/login.component";
import {RegisterComponent} from "./User/Auth/register/register.component";
import {notAuthGuard} from "./Guards/not-auth.guard";
import {DashboardComponent} from "./User/dashboard/dashboard.component";
import {inject} from "@angular/core";
import {AuthService} from "./Services/Auth/auth.service";
import {first} from "rxjs";
export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {isAuthenticated: () => inject(AuthService).isAuthenticated$.pipe(first())},
    canActivate: [notAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: {isAuthenticated: () => inject(AuthService).isAuthenticated$.pipe(first())},
    canActivate: [notAuthGuard]
  }
];
