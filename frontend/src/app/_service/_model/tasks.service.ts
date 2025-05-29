import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GroupResult } from '../../_model/_common/group-result';
import { Status } from '../../_model/_enum/status';
import { Tasks } from '../../_model/_interface/tasks';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private authUrl = Environment.apiUrl + '/tasks';

  constructor(private _http: HttpClient) {}

  getCountOfTasksByUserEmail(
    email: string,
    status: Status
  ): Observable<number> {
    return this._http.get<number>(
      `${this.authUrl}/get/count?email=${email}&status=${status}`
    );
  }

  postDataOfProjectsByUserEmailAndStatus(
    email: string,
    status: Status,
    sortPage: SortPage,
    changePage: ChangePage
  ): Observable<GroupResult<Tasks>> {
    const tableRequest = {
      sortPage,
      changePage,
    };
    return this._http.post<GroupResult<Tasks>>(
      `${this.authUrl}/post/data?email=${email}&status=${status}`,
      tableRequest
    );
  }

  countByUserIdAndStatusAndPriority(userId: string): Observable<any> {
    return this._http.get<any>(
      `${this.authUrl}/count/by-id-status-priority?id=${userId}`
    );
  }

  getById(id: string): Observable<Tasks> {
    return this._http.get<Tasks>(`${this.authUrl}/get/by-id?id=${id}`);
  }

  putTaskById(id: string, task: Tasks): Observable<Tasks> {
    return this._http.put<Tasks>(`${this.authUrl}/${id}`, task);
  }

  postNewTask(tasks: Tasks): Observable<Tasks> {
    return this._http.post<Tasks>(`${this.authUrl}/post/new`, tasks);
  }
}
