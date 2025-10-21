// frontend/src/app/modules/user/user-list/user-list.ts (FINAL CORREGIDO)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// ✅ AÑADIDO: Módulo necesario para [routerLink]
import { RouterLink } from '@angular/router'; 

// ✅ Definición de la interfaz User para tipar correctamente los datos
interface User {
  id: number;
  name: string;
  // ✅ AÑADIDO: Propiedades que faltaban en el log de error
  email: string; 
  phone: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true, 
  // ✅ CORRECCIÓN: Agregar RouterLink
  imports: [CommonModule, RouterLink], 
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit { 
  
  // ✅ CORRECCIÓN: Tipado correcto de 'users' (para solucionar user.email/phone)
  users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@test.com', phone: '123456789' },
    { id: 2, name: 'Bob', email: 'bob@test.com', phone: '987654321' }
  ];

  ngOnInit(): void {
    // Aquí puedes cargar los usuarios desde un servicio.
  }

  // ✅ CORRECCIÓN: Método onDelete (para solucionar el error en la plantilla)
  onDelete(userId: number): void {
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario con ID ${userId}?`)) {
      console.log(`Eliminando usuario ${userId}...`);
      // Lógica de eliminación con tu UserService
    }
  }
}