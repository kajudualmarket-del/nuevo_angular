// frontend/src/app/modules/auth/register/register.ts (Verificado y Corregido en rutas)

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
// ✅ RUTA CORREGIDA: Sube dos niveles, entra a 'core', busca 'auth'
import { AuthService } from '../../../core/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html', 
  styleUrls: ['./register.css'], 
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, RouterModule] 
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', Validators.required],
      phone: ['']
    }, {
      validators: this.passwordMatchValidator 
    });
  }
  
  passwordMatchValidator(form: FormGroup): null | { mismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.registerForm.valid) {
      const { email, password, name, phone } = this.registerForm.value;
      
      this.authService.register({ email, password, name, phone }).subscribe({
        next: (response) => {
          this.router.navigate(['/auth/login']); 
        },
        error: (err) => {
          this.errorMessage = err.error?.detail || 'Error desconocido durante el registro.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, corrige los errores del formulario.';
      this.registerForm.markAllAsTouched();
    }
  }
}