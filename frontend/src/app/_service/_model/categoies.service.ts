import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../../_model/_interface/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private authUrl = Environment.apiUrl + '/categories';

  constructor(private _http: HttpClient) {}

  getAllCategories(): Observable<Categories[]> {
    return this._http.get<Categories[]>(`${this.authUrl}/get/all`);
  }
}
