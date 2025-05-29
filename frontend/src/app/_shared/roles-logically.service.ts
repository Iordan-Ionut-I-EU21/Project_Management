import { Injectable } from '@angular/core';
import { JwtService } from '../_service/_http/jwt.service';
import { UserRole } from '../_model/_enum/user-role';

@Injectable({
  providedIn: 'root',
})
export class RolesLogicallyService {
  constructor(private _jtw: JwtService) {}

  isSearchPossibility(): boolean {
    return this.isAdmin() || this.isManager();
  }

  isAdminPossibility(): boolean {
    return this.isAdmin();
  }

  private isAdmin(): boolean {
    return this._jtw.getUserInfo()?.role === UserRole.ADMIN;
  }

  private isManager(): boolean {
    return this._jtw.getUserInfo()?.role === UserRole.MANAGER;
  }

  private isUser(): boolean {
    return this._jtw.getUserInfo()?.role === UserRole.TEAM_MEMBER;
  }
}
