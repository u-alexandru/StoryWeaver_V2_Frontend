import { Routes } from '@angular/router';
import {LoginComponent} from "./User/Auth/login/login.component";
import {RegisterComponent} from "./User/Auth/register/register.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];
