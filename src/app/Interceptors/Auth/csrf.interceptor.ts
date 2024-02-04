import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {CsrfService} from "../../Services/Auth/csrf.service";
import {mergeMap} from "rxjs";
export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const csrfService = inject(CsrfService)

      if (req.url.includes('sanctum/csrf-cookie') || req.url.includes('user-authenticated')) {
        return next(req);
      }

      const csrfCookie = csrfService.getCsrfCookieFromCookies();
      if(csrfCookie !== null) {
        const newReq = req.clone({
          headers: req.headers.set('X-XSRF-TOKEN', csrfCookie)
        });
        return next(newReq);
      }

  return csrfService.getCsrfCookie().pipe(mergeMap(() => {
      const csrfCookieSecond = csrfService.getCsrfCookieFromCookies();
      if(csrfCookieSecond !== null) {
        const newReq = req.clone({
          headers: req.headers.set('X-XSRF-TOKEN', csrfCookieSecond)
        });
        return next(newReq);
      }
      return next(req)
    }));
};
