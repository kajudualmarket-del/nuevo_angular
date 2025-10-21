// frontend/src/app/modules/auth/auth.routes.ts (CORREGIDO FINAL)

import { Routes } from '@angular/router';

// ✅ CORRECCIÓN: Se ELIMINA el '.ts' de las importaciones estáticas
// Se utiliza './login/login'
import { LoginComponent } from './login/login'; 
// ✅ CORRECCIÓN: Se ELIMINA el '.ts' y se USA la ruta relativa correcta './register/register'
import { RegisterComponent } from './register/register';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];