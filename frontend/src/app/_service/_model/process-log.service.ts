import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessLog } from '../../_model/_interface/process-log';
import { GroupResult } from '../../_model/_common/group-result';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { ProcessLogStatus } from '../../_model/_enum/process-log-status';

@Injectable({
  providedIn: 'root',
})
export class ProcessLogService {
  private authUrl = Environment.apiUrl + '/process/log';

  constructor(private _http: HttpClient) {}

  getDataByUserNameAndStatus(
    name: string,
    status: ProcessLogStatus | null,
    changePage: ChangePage,
    sortPage: SortPage
  ): Observable<GroupResult<ProcessLog>> {
    const tableBody = { changePage, sortPage };
    const params = new URLSearchParams();
    params.append('name', name);
    if (status !== null) {
      params.append('status', status.toString());
    }
    return this._http.post<GroupResult<ProcessLog>>(
      `${this.authUrl}/find/by?${params.toString()}`,
      tableBody
    );
  }

  getExcelByUserNameAndStatus(
    name: string,
    status: ProcessLogStatus | null,
    columns: string
  ): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    if (status !== null) {
      params.append('status', status.toString());
    }
    params.append('columns', columns);

    return this._http.get<any[]>(
      `${this.authUrl}/excel/find/by?${params.toString()}`
    );
  }
}
