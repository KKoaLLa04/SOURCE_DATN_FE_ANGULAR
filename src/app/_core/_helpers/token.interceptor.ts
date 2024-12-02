import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentUser = localStorage.getItem('Token');
  currentLayout = JSON.parse(localStorage.getItem('currentLayout'));
  currentLanguage = localStorage.getItem('language') || 'vi';

  constructor(public authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.currentUser = localStorage.getItem('Token');
    this.currentLayout = localStorage.getItem('currentLayout') ? JSON.parse(localStorage.getItem('currentLayout')): null;
    this.currentLanguage = localStorage.getItem('language') || 'vi';

    if (
      request.url.includes('/authentication/login') ||
      request.url.includes('/forgot-password') ||
      request.url.includes('/confirm-code') ||
      request.url.includes('/check-reset-code') ||
      request.url.includes('/check-change-password') ||
      request.url.includes('/common/my-information') 
    ) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
          'Access-Control-Allow-Methods':
            'GET, POST, OPTIONS, PUT, DELETE, PATCH',
          'Content-Type': 'application/json',
          Language: this.currentLanguage,
        },
      });
      return next.handle(request);
    }

    let header = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.currentUser}`,
      Layout: this.currentLayout,
      Language: this.currentLanguage || 'vi'
    }
    if(!this.currentLayout) delete header['Layout'];
    request = request.clone({
      setHeaders: header
    });
    return next.handle(request);
  }
}
