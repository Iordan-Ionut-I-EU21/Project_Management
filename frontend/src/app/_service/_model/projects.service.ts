import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Projects } from '../../_model/_interface/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private authUrl = Environment.apiUrl + '/projects';

  constructor(private _http: HttpClient) {}

  getDataOfProjectsByUserEmail(email: string): Observable<Projects[]> {
    return this._http.get<Projects[]>(
      `${this.authUrl}/get/data?email=${email}`
    );
  }
}
