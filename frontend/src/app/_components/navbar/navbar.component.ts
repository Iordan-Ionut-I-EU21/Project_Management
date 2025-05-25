import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Environment } from '../../../environments/environment';
import { on } from 'events';
import { JwtService } from '../../_service/_http/jwt.service';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../_service/_model/user.service';
import { response } from 'express';
import { error } from 'console';
import { ProjectsService } from '../../_service/_model/projects.service';
import { Projects } from '../../_model/_interface/projects';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  routes: NavItem[] = [
    //   { name: 'Dashboard', route: '/dashboard/feed', icon: 'home' },
    //   { name: 'Team', route: '/dashboard/team', icon: 'people' },
    //   { name: 'Settings', route: '/dashboard/settings', icon: 'settings' },
    //   { name: 'Reports', route: '/dashboard/reports', icon: 'assessment' },
  ];

  feet: NavItem = { name: 'Dashboard', route: '/dashboard/feed', icon: 'home' };
  name!: string;

  searchControl = new FormControl('');
  options!: Projects[];
  filteredOptions!: Observable<Projects[]>;

  constructor(
    private _jwtService: JwtService,
    private _router: Router,
    private _userService: UserService,
    private _projectsService: ProjectsService
  ) {
    this.name = this._jwtService.getUserInfo()?.name!;
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Observable<Projects[]> {
    const filterValue = value.toLowerCase();
    return this._projectsService.getDataForSuggestion(filterValue);
  }

  onSelect(value: string | null) {
    if (this._router.url === '/dashboard/projects/' + value) {
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigateByUrl('/dashboard/projects/' + value);
      });
    } else {
      this._router.navigateByUrl('/dashboard/projects/' + value);
    }
  }

  onViewUser() {
    this._userService
      .getUserByNameAndEmail(
        this._jwtService.getUserInfo()?.name!,
        this._jwtService.getEmail()!
      )
      .subscribe({
        next: (response) => {
          this._router.navigateByUrl('/dashboard/user/' + response.id);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

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
