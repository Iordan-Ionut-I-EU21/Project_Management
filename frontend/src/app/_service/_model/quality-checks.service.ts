import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { GroupResult } from '../../_model/_common/group-result';
import { QualityChecks } from '../../_model/_interface/quality-checks';
import { Observable } from 'rxjs';
import { QualityChecksFiltersDTO } from '../../_model/_dto/quality-check-filter-dto';
import {
  FindByRequestDTO,
  TableRequest,
} from '../../_model/_dto/find-by-request-dto';

@Injectable({
  providedIn: 'root',
})
export class QualityChecksService {
  private authUrl = Environment.apiUrl + '/quality/checks';

  constructor(private _http: HttpClient) {}

  postDataByUserNameAndQualityChecksFilters(
    name: string,
    changePage: ChangePage,
    sortPage: SortPage,
    qualityChecksFilterDTO: QualityChecksFiltersDTO
  ): Observable<GroupResult<QualityChecks>> {
    const tableRequest: TableRequest = { changePage, sortPage };
    const params = new URLSearchParams();
    params.append('name', name);
    const request: FindByRequestDTO = {
      tableRequest: tableRequest,
      qualityChecksFiltersDTO: qualityChecksFilterDTO,
    };
    return this._http.post<GroupResult<QualityChecks>>(
      `${this.authUrl}/find/by?${params.toString()}`,
      request
    );
  }

  countByUserNameAndQualityChecksFilters(
    name: string,
    qualityChecksFiltersDTO: QualityChecksFiltersDTO
  ): Observable<number> {
    const params = new URLSearchParams();
    params.append('name', name);
    const requestBody: FindByRequestDTO = {
      qualityChecksFiltersDTO: qualityChecksFiltersDTO,
    };
    return this._http.post<number>(
      `${this.authUrl}/count/by?${params.toString()}`,
      requestBody
    );
  }

  postExcelByUserNameAndQualityChecksFilters(
    name: string,
    columns: string,
    qualityChecksFiltersDTO: QualityChecksFiltersDTO
  ): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('columns', columns);
    const requestBody: FindByRequestDTO = {
      qualityChecksFiltersDTO: qualityChecksFiltersDTO,
    };
    return this._http.post<any[]>(
      `${this.authUrl}/excel/find/by?${params.toString()}`,
      requestBody
    );
  }
}
