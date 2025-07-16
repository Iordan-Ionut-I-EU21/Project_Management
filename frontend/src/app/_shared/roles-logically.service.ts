import { Injectable } from '@angular/core';
import { JwtService } from '../_service/_http/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class RolesLogicallyService {
  constructor(private _jtw: JwtService) {}
}
