import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_model/_interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authUrl = Environment.apiUrl + '/user';

  constructor(private _http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this.authUrl}/get/by-id?id=${id}`);
  }

  getUserByNameAndEmail(name: string, email: string): Observable<User> {
    return this._http.get<User>(
      `${this.authUrl}/get/by-name-email?name=${name}&email=${email}`
    );
  }
}
