import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProjectMembers } from '../../_model/_interface/project-members';
import { GroupResult } from '../../_model/_common/group-result';
import { SortPage } from '../../_model/_common/sort-page';
import { ChangePage } from '../../_model/_common/change-page';
import { User } from '../../_model/_interface/user';

@Injectable({
  providedIn: 'root',
})
export class ProjectsMembersService {
  private authUrl = Environment.apiUrl + '/projects/members';

  constructor(private _http: HttpClient) {}

  getCountOfProjectsByUserEmail(email: string): Observable<number> {
    return this._http.get<number>(`${this.authUrl}/get/count?email=${email}`);
  }

  getCountByRole(userId: string): Observable<any> {
    return this._http.get<any>(`${this.authUrl}/count/by-role?id=${userId}`);
  }

  postNewProjectMembers(
    projectMember: ProjectMembers
  ): Observable<ProjectMembers> {
    return this._http.post<ProjectMembers>(
      `${this.authUrl}/post/new`,
      projectMember
    );
  }

  postDataUsersByProjectId(
    projectId: string,
    sortPage: SortPage,
    changePage: ChangePage
  ): Observable<GroupResult<User>> {
    const tableRequest = {
      sortPage,
      changePage,
    };
    return this._http.post<GroupResult<User>>(
      `${this.authUrl}/post/data?projectId=${projectId}`,
      tableRequest
    );
  }

  getExcelUsersByProjectId(
    excel: string,
    projectId: string
  ): Observable<string[]> {
    return this._http.get<string[]>(
      `${this.authUrl}/get/excel?excel=${excel}&projectId=${projectId}`
    );
  }
}
