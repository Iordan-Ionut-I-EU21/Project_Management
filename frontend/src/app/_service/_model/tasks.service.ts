import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private authUrl = Environment.apiUrl + '/tasks';

  constructor(private _http: HttpClient) {}

  getCountOfTasksByUserEmail(email: string): Observable<number> {
    return this._http.get<number>(
      `${this.authUrl}/get/count?email=${email}&status=PENDING`
    );
  }
}
