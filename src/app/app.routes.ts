import { Routes } from '@angular/router';
import {LoginComponent} from "./User/Auth/login/login.component";
import {RegisterComponent} from "./User/Auth/register/register.component";
import {notAuthGuard} from "./Guards/not-auth.guard";
import {DashboardComponent} from "./User/dashboard/dashboard.component";
import {ProfileComponent} from "./User/profile/profile.component";
import {AuthGuard} from "./Guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
