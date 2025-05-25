import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { filter, Observable } from 'rxjs';
import {
  CommonModule,
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { AlertComponent } from './_service/_alert/alert/alert.component';
import { SpinnerComponent } from './_service/_spinner/spinner/spinner.component';
import { SpinnerService } from './_service/_spinner/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    AlertComponent,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showNavbar = false;
  isAppReady = false;

  loading$: Observable<boolean>;

  constructor(
    private _spinnerService: SpinnerService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('authentication');
        this.isAppReady = true;
      }
    });
    this.loading$ = this._spinnerService.loading$;
  }
}
