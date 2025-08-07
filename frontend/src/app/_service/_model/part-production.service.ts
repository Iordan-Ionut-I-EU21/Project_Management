import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupResult } from '../../_model/_common/group-result';
import { PartProduction } from '../../_model/_interface/part-production';
import { ChangePage } from '../../_model/_common/change-page';
import {
  FindByRequestDTO,
  TableRequest,
} from '../../_model/_dto/find-by-request-dto';
import { SortPage } from '../../_model/_common/sort-page';
import { PartProductionFiltersDTO } from '../../_model/_dto/part_production-filter-dto';

@Injectable({
  providedIn: 'root',
})
export class PartProductionService {
  private authUrl = Environment.apiUrl + '/part/production';

  constructor(private _http: HttpClient) {}

  postDataByMachineNameOrIdAndPartProductionFilters(
    machine_name_or_id: string,
    changePage: ChangePage,
    sortPage: SortPage,
    partProductionFiltersDTO: PartProductionFiltersDTO
  ): Observable<GroupResult<PartProduction>> {
    const tableRequest: TableRequest = {
      changePage: changePage,
      sortPage: sortPage,
    };
    return this._http.post<GroupResult<PartProduction>>(
      `${this.authUrl}/find/by?machine_name_or_id=${machine_name_or_id}`,
      {
        tableRequest: tableRequest,
        partProductionFiltersDTO: partProductionFiltersDTO,
      } as FindByRequestDTO
    );
  }

  countByMachineNameOrIdAndPartProductionFilters(
    machine_name_or_id: string,
    partProductionFiltersDTO: PartProductionFiltersDTO
  ): Observable<number> {
    return this._http.post<number>(
      `${this.authUrl}/count/by?machine_name_or_id=${machine_name_or_id}`,
      { partProductionFiltersDTO } as FindByRequestDTO
    );
  }

  excelDataByMachineNameOrIdAndPartProductionFilters(
    machine_name_or_id: string,
    columns: string,
    partProductionFiltersDTO: PartProductionFiltersDTO
  ): Observable<any[]> {
    return this._http.post<any[]>(
      `${this.authUrl}/excel/find/by?machine_name_or_id=${machine_name_or_id}&columns=${columns}`,
      { partProductionFiltersDTO: partProductionFiltersDTO } as FindByRequestDTO
    );
  }
}
