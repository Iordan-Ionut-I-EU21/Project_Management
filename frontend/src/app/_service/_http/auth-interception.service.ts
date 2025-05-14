import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _jwt: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._jwt.getToken(Environment.jwtToken);
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
