import { CanActivateFn } from '@angular/router';
import {map, Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../Services/Auth/auth.service";
export const notAuthGuard: CanActivateFn = (route, state) : Observable<boolean> => {
  const authService = inject(AuthService);
  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => !isAuthenticated)
  );
};
