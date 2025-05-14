import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsMembersService {
  private authUrl = Environment.apiUrl + '/projects/members';

  constructor(private _http: HttpClient) {}

  getCountOfProjectsByUserEmail(email: string): Observable<number> {
    return this._http.get<number>(
      `${this.authUrl}/get/count?email=${email}`
    );
  }
}
