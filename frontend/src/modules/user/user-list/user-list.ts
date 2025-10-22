// frontend/src/app/modules/user/user-list/user-list.ts (COMPLETO Y FUNCIONAL)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 
import { UserService, User } from '../user.service'; // ✅ Importa el nuevo servicio

@Component({
  selector: 'app-user-list',
  standalone: true, 
  imports: [
    CommonModule, 
    RouterLink, 
    HttpClientModule // Necesario para usar HttpClient en este componente standalone
  ], 
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  providers: [UserService] // ✅ Provee el servicio localmente
})
export class UserListComponent implements OnInit { 
  users: User[] = [];

  // ✅ Inyección de dependencia del servicio
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Carga los usuarios al iniciar
  }

  /**
   * Función para obtener los usuarios del backend usando el servicio.
   */
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data; // Asigna los datos reales
        console.log('Usuarios cargados correctamente:', data);
      },
      error: (err) => {
        console.error('Error al cargar usuarios. Verifica el token y el CORS en el backend.', err);
      }
    });
  }

  /**
   * Método para manejar la eliminación de usuarios.
   */
  onDelete(userId: number): void {
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario con ID ${userId}?`)) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log(`Usuario ${userId} eliminado.`);
          this.loadUsers(); // Recarga la lista para actualizar la vista
        },
        error: (err) => {
          console.error(`Error al eliminar usuario ${userId}:`, err);
          alert('Error al eliminar el usuario.');
        }
      });
    }
  }
}