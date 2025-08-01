import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePage } from '../../_model/_common/change-page';
import { SortPage } from '../../_model/_common/sort-page';
import { GroupResult } from '../../_model/_common/group-result';
import { Process } from '../../_model/_interface/process';
import { Observable } from 'rxjs';
import { CarsParts } from '../../_model/_interface/cars-parts';
import { CarsPartsFilterDTO } from '../../_model/_dto/cars-parts-filter-dto';
import {
  FindByRequestDTO,
  TableRequest,
} from '../../_model/_dto/find-by-request-dto';

@Injectable({
  providedIn: 'root',
})
export class CarsPartsService {
  private authUrl = Environment.apiUrl + '/car/parts';

  constructor(private _http: HttpClient) {}

  postDataByUserNameAndCarsPartsFilters(
    name: string,
    changePage: ChangePage,
    sortPage: SortPage,
    carsPartsFilterDTO: CarsPartsFilterDTO
  ): Observable<GroupResult<CarsParts>> {
    const tableBody: TableRequest = { changePage, sortPage };
    const params = new URLSearchParams();
    params.append('name', name);
    const request: FindByRequestDTO = {
      tableRequest: tableBody,
      carsPartsFiltersDTO: carsPartsFilterDTO,
    };
    return this._http.post<GroupResult<CarsParts>>(
      `${this.authUrl}/find/by?${params.toString()}`,
      request
    );
  }

  countByUsernameAndCarsPartsFilters(
    name: string,
    carsPartsFiltersDTO: CarsPartsFilterDTO
  ): Observable<number> {
    const params = new URLSearchParams();
    params.append('name', name);
    const request: FindByRequestDTO = {
      carsPartsFiltersDTO: carsPartsFiltersDTO,
    };
    return this._http.post<number>(
      `${this.authUrl}/count/by?${params.toString()}`,
      request
    );
  }

  getExcelByUserNameAndCarsPartsFilters(
    name: string,
    columns: string,
    carsPartsFilterDTO: CarsPartsFilterDTO
  ): Observable<any[]> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('columns', columns);
    const request: FindByRequestDTO = {
      carsPartsFiltersDTO: carsPartsFilterDTO,
    };
    return this._http.post<any[]>(
      `${this.authUrl}/excel/find/by?${params.toString()}`,
      request
    );
  }
}
