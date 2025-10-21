// frontend/src/app/core/auth-guard.ts (Verificado)

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth'; // ✅ RUTA CORRECTA

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Si el usuario tiene un token (está autenticado), permite el acceso.
  if (authService.hasToken()) { 
    return true;
  } else {
    // Si no está autenticado, redirige a la página de login.
    router.navigate(['/auth/login']);
    return false;
  }
};