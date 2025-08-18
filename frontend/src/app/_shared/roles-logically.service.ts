import { Injectable } from '@angular/core';
import { JwtService } from '../_service/_http/jwt.service';
import { UserRole } from '../_model/_enum/user-role';

@Injectable({
  providedIn: 'root',
})
export class RolesLogicallyService {
  constructor(private _jtw: JwtService) {}

  onCanMakeChange() {}

  onIsWorker(): boolean {
    return this._jtw.getUserInfo()?.role! === UserRole.WORKER;
  }

  onIsAdmin(): boolean {
    return this._jtw.getUserInfo()?.role! === UserRole.ADMIN;
  }

  onIsAdminOrManager(): boolean {
    return (
      this._jtw.getUserInfo()?.role! === UserRole.ADMIN ||
      this._jtw.getUserInfo()?.role! === UserRole.MANAGER
    );
  }
}
