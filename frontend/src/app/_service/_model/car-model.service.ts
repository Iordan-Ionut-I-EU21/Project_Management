import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel } from '../../_model/_interface/car-model';

@Injectable({
  providedIn: 'root',
})
export class CarsModelService {
  private authUrl = Environment.apiUrl + '/car/model';

  constructor(private _http: HttpClient) {}

  findByName(name: string): Observable<CarModel[]> {
    return this._http.get<CarModel[]>(
      `${this.authUrl}/find-search/by?name=${name}`
    );
  }
}
