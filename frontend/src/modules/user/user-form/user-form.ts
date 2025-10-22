// frontend/src/app/modules/user/user-form/user-form.ts (FINAL CORREGIDO Y COMPLETO)

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { RouterLink, ActivatedRoute, Router } from '@angular/router'; // <-- Añadido Router

// Importar servicio y modelo (asume que la ruta al servicio es correcta)
import { UserService, User } from '../user.service'; 

@Component({
  selector: 'app-user-form',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  providers: [UserService], // <-- Provee el servicio
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent implements OnInit { 
  
  userForm!: FormGroup; 
  isEditMode: boolean = false; 
  userId: number | null = null;
  
  private fb = inject(FormBuilder); 
  private route = inject(ActivatedRoute); 
  private router = inject(Router); 
  private userService = inject(UserService); 

  ngOnInit(): void {
    // Inicialización del formulario con todos los campos necesarios
    this.userForm = this.fb.group({
      id: [null], 
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], // Asumiendo que 'phone' es opcional o no validado
      password: [''], 
    });

    // Lógica para detectar si es modo edición
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
            this.userId = +id;
            this.isEditMode = true;
            this.loadUser(this.userId); 
            // En modo edición, no requerimos la contraseña
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
        }
    });
  }

  loadUser(id: number): void {
      this.userService.getUserById(id).subscribe({
          next: (user: User) => {
              // Carga los datos del usuario en el formulario
              this.userForm.patchValue(user); 
          },
          error: (err) => {
              console.error('Error al cargar usuario para edición', err);
              // Redirigir al listado si no se puede cargar el usuario
              this.router.navigate(['/admin/users']); 
          }
      });
  }

  onSubmit() {
    if (this.userForm.invalid) {
        return; 
    }

    const userData = this.userForm.value;

    if (this.isEditMode && this.userId) {
        // Lógica para Actualizar (PUT)
        this.userService.updateUser(this.userId, userData).subscribe({
            next: () => {
                alert('Usuario actualizado con éxito');
                this.router.navigate(['/admin/users']);
            },
            error: (err) => console.error('Error al actualizar', err)
        });
    } else {
        // Lógica para Crear nuevo usuario (POST) - (Necesitarías implementar userService.createUser)
        console.log('Modo Creación: Enviar datos para crear usuario');
        // this.userService.createUser(userData).subscribe(...);
    }
  }
}