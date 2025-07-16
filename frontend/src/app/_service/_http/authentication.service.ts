import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordRequest } from '../../_model/_common/password-request';
import { LoginRequest } from '../../_model/_common/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authUrl = Environment.apiUrl + '/auth';
  private authUrlMail = Environment.apiUrl + '/sendEmail/reset';
  constructor(private _http: HttpClient) {}

  login(userLogin: LoginRequest): Observable<any> {
    return this._http.post<any>(`${this.authUrl}/login`, userLogin);
  }

  password(request: PasswordRequest): Observable<any> {
    return this._http.post<any>(`${this.authUrl}/password`, request);
  }

  mail(email: string): Observable<any> {
    return this._http.get<any>(`${this.authUrlMail}?email=${email}`);
  }
}
