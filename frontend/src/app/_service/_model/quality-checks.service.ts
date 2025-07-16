import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { GroupResult } from '../../_model/_common/group-result';
import { QualityChecks } from '../../_model/_interface/quality-checks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QualityChecksService {
  private authUrl = Environment.apiUrl + '/quality/checks';

  constructor(private _http: HttpClient) {}

  getDataByUserNameAndStatus(
    name: string,
    changePage: ChangePage,
    sortPage: SortPage
  ): Observable<GroupResult<QualityChecks>> {
    const tableBody = { changePage, sortPage };
    const params = new URLSearchParams();
    params.append('name', name);
    
    return this._http.post<GroupResult<QualityChecks>>(
      `${this.authUrl}/find/by?${params.toString()}`,
      tableBody
    );
  }

  getExcelByUserNameAndStatus(
    name: string,
    columns: string
  ): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('columns', columns);

    return this._http.get<any[]>(
      `${this.authUrl}/excel/find/by?${params.toString()}`
    );
  }
}
