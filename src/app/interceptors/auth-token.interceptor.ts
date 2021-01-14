import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      // Clone the request to add the new header.
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
