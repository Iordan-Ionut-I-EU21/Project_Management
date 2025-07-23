import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { GroupResult } from '../../_model/_common/group-result';
import { Process } from '../../_model/_interface/process';
import { Observable } from 'rxjs';
import { CarsParts } from '../../_model/_interface/cars-parts';

@Injectable({
  providedIn: 'root',
})
export class CarsPartsService {
  private authUrl = Environment.apiUrl + '/car/parts';

  constructor(private _http: HttpClient) {}

  getDataByUserName(
    name: string,
    changePage: ChangePage,
    sortPage: SortPage
  ): Observable<GroupResult<CarsParts>> {
    const tableBody = { changePage, sortPage };
    const params = new URLSearchParams();
    params.append('name', name);

    return this._http.post<GroupResult<CarsParts>>(
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

  getExcelByUserName(name: string, columns: string): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('columns', columns);

    return this._http.get<any[]>(
      `${this.authUrl}/excel/find/by?${params.toString()}`
    );
  }
}
