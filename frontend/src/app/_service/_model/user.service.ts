import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_model/_interface/user';
import { Observable } from 'rxjs';
import { UserInformationDTO } from '../../_model/_dto/user-information-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authUrl = Environment.apiUrl + '/user';

  constructor(private _http: HttpClient) {}

  countInformationByUserName(name: string): Observable<UserInformationDTO> {
    return this._http.get<UserInformationDTO>(
      `${this.authUrl}/information?name=${name}`
    );
  }
}
