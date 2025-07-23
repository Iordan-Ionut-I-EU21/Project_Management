import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { GroupResult } from '../../_model/_common/group-result';
import { Process } from '../../_model/_interface/process';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  private authUrl = Environment.apiUrl + '/parts';

  constructor(private _http: HttpClient) {}

  getDataByUserName(
    name: string,
    changePage: ChangePage,
    sortPage: SortPage
  ): Observable<GroupResult<Process>> {
    const tableBody = { changePage, sortPage };
    const params = new URLSearchParams();
    params.append('name', name);

    return this._http.post<GroupResult<Process>>(
      `${this.authUrl}/find/by?${params.toString()}`,
      tableBody
    );
  }

  countByUsername(name: string): Observable<number> {
    const params = new URLSearchParams();
    params.append('name', name);

    return this._http.get<number>(
      `${this.authUrl}/count/by?${params.toString()}`
    );
  }
}
