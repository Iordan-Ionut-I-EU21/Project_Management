import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../_model/_interface/user';
import { Observable } from 'rxjs';
import { UserInformationDTO } from '../../_model/_dto/user-information-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authUrl = Environment.apiUrl + '/user';

  constructor(private _http: HttpClient) {}

  countInformation(
    name: string,
    machine_name_or_id: string
  ): Observable<UserInformationDTO> {
    const params = new HttpParams()
      .append('name', name)
      .append('machine_name_or_id', machine_name_or_id);
    return this._http.get<UserInformationDTO>(
      `${this.authUrl}/information?${params}`
    );
  }

  findUserByUsernameOrId(
    user_username_or_id_or_email: string
  ): Observable<User> {
    const params = new HttpParams().append(
      'user_username_or_id_or_email',
      user_username_or_id_or_email
    );
    return this._http.get<User>(`${this.authUrl}/find/by?${params}`);
  }

  canAccessPage(user_username_or_id_or_email: string): Observable<Boolean> {
    const params = new HttpParams().append(
      'user_username_or_id_or_email',
      user_username_or_id_or_email
    );
    return this._http.get<Boolean>(`${this.authUrl}/can-access?${params}`);
  }
}
