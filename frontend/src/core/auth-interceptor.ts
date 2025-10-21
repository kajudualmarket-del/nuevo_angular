// frontend/src/app/core/auth-interceptor.ts (Corregido y verificado)

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth'; // ✅ RUTA CORRECTA

// Definición de URL Públicas (Asegúrate de que esta lógica sea correcta para tu backend)
const PUBLIC_URLS = ['/auth/login', '/auth/register']; 
const isPublicUrl = (url: string) => PUBLIC_URLS.some(u => url.includes(u));


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Comprueba si la URL es pública para no enviar el token (ej: login, register)
  if (isPublicUrl(req.url)) { 
    return next(req);
  }
  
  // Si hay token, lo adjunta.
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  }

  // Si no es una URL pública y no hay token, continúa sin modificar la solicitud.
  return next(req);
};