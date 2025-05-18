import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Environment } from '../../../environments/environment';
import { on } from 'events';
import { JwtService } from '../../_service/_http/jwt.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  routes: NavItem[] = [
    { name: 'Dashboard', route: '/dashboard/feed', icon: 'home' },
    { name: 'Team', route: '/dashboard/team', icon: 'people' },
    { name: 'Settings', route: '/dashboard/settings', icon: 'settings' },
    { name: 'Reports', route: '/dashboard/reports', icon: 'assessment' },
  ];

  feet: NavItem = this.routes[0];

  constructor(private _jwtService: JwtService, private _router: Router) {}

  ngAfterViewInit(): void {}

  onLogout() {
    this._jwtService.logout(Environment.jwtToken);
    this._router.navigate(['/authentication/login']);
  }
}

interface NavItem {
  name: string;
  route: string;
  icon: string;
}
