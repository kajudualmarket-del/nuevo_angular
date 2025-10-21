// frontend/src/app/app.routes.ts (CORRECCIÓN FINAL DE LAZY LOADING)

import { Routes } from '@angular/router';
import { LayoutComponent } from '../core/layout/layout';
import { AuthGuard } from '../core/auth-guard';

export const routes: Routes = [
  // 1. Rutas de Autenticación (Públicas)
  {
    path: 'auth',
    // ✅ CAMBIO CLAVE: De './modules/' a '../modules/'
    loadChildren: () => import('../modules/auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },

  // 2. Rutas Protegidas (Dashboard)
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        // ✅ CAMBIO CLAVE: De './modules/' a '../modules/'
        loadChildren: () => import('../modules/user/user.routes').then(m => m.USER_ROUTES)
      },
      // ... (el resto es correcto)
    ]
  },
  
  // 3. Rutas por Defecto
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'auth' },
];