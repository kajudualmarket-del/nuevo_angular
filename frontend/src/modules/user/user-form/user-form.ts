// frontend/src/app/modules/user/user-form/user-form.ts (FINAL CORREGIDO)

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// ✅ AÑADIDO: Módulos necesarios para [formGroup] y validación.
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
// ✅ AÑADIDO: Módulo necesario para [routerLink] y lógica de ruta.
import { RouterLink, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-user-form',
  standalone: true, 
  // ✅ CORRECCIÓN: Agregar RouterLink y ReactiveFormsModule
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent implements OnInit { 
  
  // ✅ CORRECCIÓN: DECLARAR userForm (para solucionar los TS2339)
  userForm!: FormGroup; 
  isEditMode: boolean = false; 

  private fb = inject(FormBuilder); // Inject para inicializar FormGroup
  // private route = inject(ActivatedRoute); // Necesario para obtener el ID de edición

  constructor() {}

  ngOnInit(): void {
    // Inicialización del FormGroup para solucionar errores de plantilla
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Asegúrate de incluir los campos que usas en user-form.html
      // Por ejemplo:
      // phone: [''], 
      // password: ['', Validators.required], 
    });

    // this.isEditMode = ... (lógica del router para edición)
  }

  onSubmit() {
    // Lógica para guardar o actualizar el usuario
  }
}