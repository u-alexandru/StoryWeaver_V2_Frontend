import { CanActivateFn } from '@angular/router';
export const notAuthGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = route.data['isAuthenticated'];
  return !isAuthenticated;
};
