import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDisabledInitialNavigation, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserCacheLocation, InteractionType, LogLevel, PublicClientApplication, type IPublicClientApplication } from '@azure/msal-browser';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService, type MsalGuardConfiguration, type MsalInterceptorConfiguration } from '@azure/msal-angular';
import { isIE } from './helper/browser.helper';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me'; //create enum

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '7212db79-2659-4773-96a1-461905bda9ea',
      authority: 'https://login.microsoftonline.com/common/',
      redirectUri: 'http://localhost:4200/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      // storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withDisabledInitialNavigation()), 
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(
      // MsalModule
      MsalModule.forRoot(
        new PublicClientApplication({
          auth: {
            clientId: '7212db79-2659-4773-96a1-461905bda9ea',
            authority: 'https://login.microsoftonline.com/common/',
            redirectUri: 'http://localhost:4200',
          },
          cache: {
            cacheLocation: "localStorage",
            // storeAuthStateInCookie: isIE(),
          },
        }),
        {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ["user.read"],
          },
        },
        {
          interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
          protectedResourceMap: new Map([
            [GRAPH_ENDPOINT, ["user.read"]],
          ]),
        }
      ),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};
