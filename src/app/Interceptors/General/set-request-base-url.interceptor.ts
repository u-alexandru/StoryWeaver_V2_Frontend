import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const setRequestBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // set the base url for all http requests
  const baseUrl = environment.baseUrl;
  const request = req.clone({ url: `${baseUrl}/${req.url}` });
  return next(request);
};
