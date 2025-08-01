import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { GroupResult } from '../../_model/_common/group-result';
import { QualityChecks } from '../../_model/_interface/quality-checks';
import { Observable } from 'rxjs';
import { Cars } from '../../_model/_interface/car';
import { CountViewDTO } from '../../_model/_dto/count-view-dto';
import { CarsFiltersDTO } from '../../_model/_dto/cars-filter-dto';
import {
  FindByRequestDTO,
  TableRequest,
} from '../../_model/_dto/find-by-request-dto';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private authUrl = Environment.apiUrl + '/cars';

  constructor(private _http: HttpClient) {}

  postDataByUserNameAndCarsFilters(
    name: string,
    changePage: ChangePage,
    sortPage: SortPage,
    carsFiltersDTO: CarsFiltersDTO
  ): Observable<GroupResult<Cars>> {
    const tableRequest: TableRequest = {
      changePage: changePage,
      sortPage: sortPage,
    };
    const requestBody: FindByRequestDTO = {
      tableRequest: tableRequest,
      carsFiltersDTO: carsFiltersDTO,
    };
    const params = new URLSearchParams();
    params.append('name', name);

    return this._http.post<GroupResult<Cars>>(
      `${this.authUrl}/find/by?${params.toString()}`,
      requestBody
    );
  }

  countByUsernameAndCarsFilters(
    name: string,
    carsFilterDTO: CarsFiltersDTO
  ): Observable<number> {
    const params = new URLSearchParams();
    params.append('name', name);
    const requestBody = {
      carsFiltersDTO: carsFilterDTO,
    };
    return this._http.post<number>(
      `${this.authUrl}/count/by?${params.toString()}`,
      requestBody
    );
  }

  postExcelByUserNameAncCarsFilter(
    name: string,
    columns: string,
    carsFilterDTO: CarsFiltersDTO
  ): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('columns', columns);
    const requestBody = {
      carsFiltersDTO: carsFilterDTO,
    };
    return this._http.post<any[]>(
      `${this.authUrl}/excel/find/by?${params.toString()}`,
      requestBody
    );
  }

  countStatusByCarModelId(carModelId: string): Observable<CountViewDTO> {
    return this._http.get<CountViewDTO>(
      `${this.authUrl}/count/dialog/by?carModelId=${carModelId}`
    );
  }
}
