import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_model/_interface/user';
import { Observable } from 'rxjs';
import { UserRole } from '../../_model/_enum/user-role';

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

  getAllUserDifferentOnRole(role: UserRole): Observable<User[]> {
    return this._http.get<User[]>(
      `${this.authUrl}/get/different-role?role=${role}`
    );
  }

  getUserByEmail(email: string): Observable<boolean> {
    return this._http.get<boolean>(
      `${this.authUrl}/get/by-email?email=${email}`
    );
  }

  postNewUser(user: User): Observable<User> {
    return this._http.post<User>(`${this.authUrl}/post/new`, user);
  }
}
