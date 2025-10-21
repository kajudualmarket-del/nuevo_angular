// frontend/src/app/modules/auth/login/login.ts (Verificado y Corregido en rutas)

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// ✅ RUTA CORREGIDA: Sube dos niveles, entra a 'core', busca 'auth'
import { AuthService } from '../../../core/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html', 
  styleUrls: ['./login.css'],  
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule] 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.router.navigate(['/admin/users']); 
        },
        error: (err) => {
          this.errorMessage = err.error?.detail || 'Error de conexión. Inténtalo de nuevo.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, introduce credenciales válidas.';
      this.loginForm.markAllAsTouched();
    }
  }
}