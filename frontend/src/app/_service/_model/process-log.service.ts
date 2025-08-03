import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessLog } from '../../_model/_interface/process-log';
import { GroupResult } from '../../_model/_common/group-result';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { ProcessLogsFilterDTO } from '../../_model/_dto/process-log-filter-dto';
import {
  FindByRequestDTO,
  TableRequest,
} from '../../_model/_dto/find-by-request-dto';
import { MachineUsedFiltersDTO } from '../../_model/_dto/machine-used-filters-dto';

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
      `${this.authUrl}/find/by-process-log?${params.toString()}`,
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
      `${this.authUrl}/excel/find/by-process-log?${params.toString()}`,
      requestBody
    );
  }

  postDataByUsernameAndMachineUsedFilters(
    userName: string,
    changePage: ChangePage,
    sortPage: SortPage,
    machineUsedFiltersDTO: MachineUsedFiltersDTO
  ): Observable<GroupResult<ProcessLog>> {
    const tableRequest: TableRequest = {
      changePage: changePage,
      sortPage: sortPage,
    };
    const requestBody: FindByRequestDTO = {
      tableRequest: tableRequest,
      machineUsedFiltersDTO: machineUsedFiltersDTO,
    };
    const params = new URLSearchParams();
    params.append('username', userName);

    return this._http.post<GroupResult<ProcessLog>>(
      `${this.authUrl}/find/by-machine-used?${params.toString()}`,
      requestBody
    );
  }

  postExcelByUserNameAndMachineUsedFilters(
    name: string,
    columns: string,
    machineUsedFiltersDTO: MachineUsedFiltersDTO
  ): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('columns', columns);
    const requestBody: FindByRequestDTO = {
      machineUsedFiltersDTO: machineUsedFiltersDTO,
    };
    return this._http.post<any[]>(
      `${this.authUrl}/excel/find/by-machine-used?${params.toString()}`,
      requestBody
    );
  }
}
