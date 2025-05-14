import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { JwtService } from './_service/_http/jwt.service';
import { AuthInterceptor } from './_service/_http/auth-interception.service';
import { LoadingInterceptor } from './_service/_spinner/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    JwtService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
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
    provideHttpClient(withFetch()),
  ],
};
