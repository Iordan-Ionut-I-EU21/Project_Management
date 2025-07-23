import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountViewDTO } from '../../_model/_dto/count-view-dto';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private authUrl = Environment.apiUrl + '/machines';

  constructor(private _http: HttpClient) {}

  countStatusByMachineId(
    machineId: string
  ): Observable<CountViewDTO> {
    return this._http.get<CountViewDTO>(
      `${this.authUrl}/count/dialog/by?machineId=${machineId}`
    );
  }
}
