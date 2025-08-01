import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessLog } from '../../_model/_interface/process-log';
import { GroupResult } from '../../_model/_common/group-result';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { ProcessLogStatus } from '../../_model/_enum/process-log-status';
import { ProcessLogsFilterDTO } from '../../_model/_dto/process-log-filter-dto';

@Injectable({
  providedIn: 'root',
})
export class ProcessLogService {
  private authUrl = Environment.apiUrl + '/process/log';

  constructor(private _http: HttpClient) {}

  postDataByUserNameAndProcessLogFilters(
    name: string,
    changePage: ChangePage,
    sortPage: SortPage,
    processLogsFilter: ProcessLogsFilterDTO
  ): Observable<GroupResult<ProcessLog>> {
    const tableRequest = { changePage: changePage, sortPage: sortPage };
    const requestBody = {
      tableRequest: tableRequest,
      processLogsFilterDTO: processLogsFilter,
    };
    const params = new URLSearchParams();
    params.append('name', name);

    return this._http.post<GroupResult<ProcessLog>>(
      `${this.authUrl}/find/by?${params.toString()}`,
      requestBody
    );
  }

  postExcelByUserNameAndProcessLogFilters(
    name: string,
    columns: string,
    processLogsFilter: ProcessLogsFilterDTO
  ): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('columns', columns);
    const requestBody = {
      processLogsFilterDTO: processLogsFilter,
    };
    return this._http.post<any[]>(
      `${this.authUrl}/excel/find/by?${params.toString()}`,
      requestBody
    );
  }
}
