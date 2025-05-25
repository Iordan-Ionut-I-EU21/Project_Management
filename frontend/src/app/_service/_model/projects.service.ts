import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Projects } from '../../_model/_interface/projects';
import { SortPage } from '../../_model/_common/sort-page';
import { ChangePage } from '../../_model/_common/change-page';
import { GroupResult } from '../../_model/_common/group-result';
import { Tasks } from '../../_model/_interface/tasks';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private authUrl = Environment.apiUrl + '/projects';

  constructor(private _http: HttpClient) {}

  postDataOfProjectsByUserEmail(
    email: string,
    sortPage: SortPage,
    changePage: ChangePage
  ): Observable<GroupResult<Projects>> {
    const tableRequest = {
      sortPage,
      changePage,
    };
    return this._http.post<GroupResult<Projects>>(
      `${this.authUrl}/post/data?email=${email}`,
      tableRequest
    );
  }

  getStatusCounts(projectId: string): Observable<any> {
    return this._http.get<any>(
      `${this.authUrl}/count/status?projectId=${projectId}`
    );
  }

  getListByProjectId(
    projectId: string,
    sortPage: SortPage,
    changePage: ChangePage
  ): Observable<GroupResult<Tasks>> {
    const tableRequest = {
      sortPage,
      changePage,
    };
    return this._http.post<GroupResult<Tasks>>(
      `${this.authUrl}/post/list/by-projectId?projectId=${projectId}`,
      tableRequest
    );
  }

  getDataForSuggestion(name: string): Observable<Projects[]> {
    return this._http.get<Projects[]>(
      `${this.authUrl}/get/suggestion?name=${name}`
    );
  }

  postDataOfProjectsBySuggestion(
    name: string,
    sortPage: SortPage,
    changePage: ChangePage
  ): Observable<GroupResult<Projects>> {
    const tableRequest = {
      sortPage,
      changePage,
    };
    return this._http.post<GroupResult<Projects>>(
      `${this.authUrl}/post/data/suggestion?name=${name}`,
      tableRequest
    );
  }
}
