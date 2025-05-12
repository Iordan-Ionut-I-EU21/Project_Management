import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private _cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkTokenExpiration(Environment.jwtToken);
      this._cookieService.check(Environment.jwtOtp);
    }
  }

  saveToken(name: string, token: string): void {
    this._cookieService.set(name, token, {
      expires: 7,
      secure: location.protocol === 'https:',
      sameSite: 'Lax',
      path: '/',
    });
    if (isPlatformBrowser(this.platformId)) {
      this.checkTokenExpiration(Environment.jwtToken);
    }
  }

  getToken(name: string): string | null {
    return this._cookieService.get(name) || null;
  }

  decodeToken(name: string): any {
    const token = this.getToken(name);
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getTokenExpiration(name: string): number | null {
    const decodedToken = this.decodeToken(name);
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp * 1000;
    }
    return null;
  }

  isTokenExpired(name: string): boolean {
    const expiration = this.getTokenExpiration(name);
    if (expiration) {
      const currentTime = new Date().getTime();
      return currentTime > expiration;
    }
    return true;
  }

  checkTokenExpiration(name: string): void {
    if (this.isTokenExpired(name)) {
      this.logout(name);
    } else {
      const expirationTime = this.getTokenExpiration(name);
      if (expirationTime) {
        const timeout = expirationTime - new Date().getTime();
        setTimeout(() => this.logout(name), timeout);
      }
    }
  }

  getUserInfo(): {
    name: string;
    email: string;
    role: string;
  } | null {
    const decodedToken = this.decodeToken(Environment.jwtToken);

    if (decodedToken) {
      const userInfo = {
        name: decodedToken.name ?? '',
        email: decodedToken.email ?? '',
        role: decodedToken.role ?? '',
      };
      return userInfo;
    } else {
      return null;
    }
  }

  logout(name: string): void {
    this._cookieService.delete(name, '/');
  }
}
