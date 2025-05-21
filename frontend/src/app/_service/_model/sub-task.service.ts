import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTasks } from '../../_model/_interface/sub-tasks';
import { GroupResult } from '../../_model/_common/group-result';
import { SortPage } from '../../_model/_common/sort-page';
import { ChangePage } from '../../_model/_common/change-page';

@Injectable({
  providedIn: 'root',
})
export class SubTasksService {
  private authUrl = Environment.apiUrl + '/sub/tasks';

  constructor(private _http: HttpClient) {}

  postListById(
    taskId: string,
    sortPage: SortPage,
    changePage: ChangePage
  ): Observable<GroupResult<SubTasks>> {
    const tableRequest = {
      sortPage,
      changePage,
    };
    return this._http.post<GroupResult<SubTasks>>(
      `${this.authUrl}/post/list/by-id?taskId=${taskId}`,
      tableRequest
    );
  }
}
