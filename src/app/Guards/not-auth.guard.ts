import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../Services/Auth/auth.service";
import {map} from "rxjs";

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => !isAuthenticated)
  );
};
