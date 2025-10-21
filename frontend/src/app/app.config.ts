// frontend/src/app/app.config.ts (VERSIÓN FINAL)

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { routes } from './app.routes'; 

// ✅ CORRECCIÓN FINAL: Cambiamos la ruta de './core/' a '../core/'
import { authInterceptor } from '../core/auth-interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]) 
    )
  ]
};