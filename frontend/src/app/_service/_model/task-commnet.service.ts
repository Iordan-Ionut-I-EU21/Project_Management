import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksComments } from '../../_model/_interface/task-comment';

@Injectable({
  providedIn: 'root',
})
export class TasksCommentsService {
  private authUrl = Environment.apiUrl + '/task/comments';

  constructor(private _http: HttpClient) {}

  getListByTaskId(taskId: string): Observable<TasksComments[]> {
    return this._http.get<TasksComments[]>(
      `${this.authUrl}/get/list/by-taskId?taskId=${taskId}`
    );
  }
}
