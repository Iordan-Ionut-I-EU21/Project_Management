import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoadingInterceptor } from './_service/_spinner/loading-interceptor';
import { JwtService } from './_service/_http/jwt.service';
import { AuthInterceptor } from './_service/_http/auth-interception.service';
import { provideServerRendering } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    JwtService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (appInit: AppInitService) => () => appInit.initApp(),
    //   deps: [AppInitService],
    //   multi: true,
    // },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideServerRendering(),
    provideHttpClient(withFetch()),
    { provide: APP_BASE_HREF, useValue: '/' },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
