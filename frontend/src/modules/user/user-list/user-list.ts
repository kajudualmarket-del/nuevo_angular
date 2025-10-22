// frontend/src/app/modules/user/user-list/user-list.ts (COMPLETO Y FUNCIONAL)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 
import { UserService, User } from '../user.service';
import { NotificationService } from '../../../core/notification.service'; // ✅ Importar servicio de notificaciones

@Component({
  selector: 'app-user-list',
  standalone: true, 
  imports: [
    CommonModule, 
    RouterLink, 
    HttpClientModule
  ], 
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  providers: [UserService]
})
export class UserListComponent implements OnInit { 
  users: User[] = [];

  // ✅ Inyección del servicio de notificaciones
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Función para obtener los usuarios del backend usando el servicio.
   */
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Usuarios cargados correctamente:', data);
        
        // ✅ Notificación de éxito al cargar usuarios
        if (data.length > 0) {
          this.notificationService.success(`✅ ${data.length} usuario(s) cargado(s) correctamente`);
        } else {
          this.notificationService.info('ℹ️ No hay usuarios registrados');
        }
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        
        // ✅ Notificación de error
        this.notificationService.error('❌ Error al cargar los usuarios. Por favor, intenta de nuevo.');
      }
    });
  }

  /**
   * Método para manejar la eliminación de usuarios.
   */
  onDelete(userId: number): void {
    // Buscar el nombre del usuario para mostrarlo en la notificación
    const user = this.users.find(u => u.id === userId);
    const userName = user ? user.name : `usuario #${userId}`;
    
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${userName}?`)) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log(`Usuario ${userId} eliminado.`);
          
          // ✅ Notificación de éxito al eliminar
          this.notificationService.success(`✅ Usuario ${userName} eliminado correctamente`);
          
          // Recarga la lista para actualizar la vista
          this.loadUsers();
        },
        error: (err) => {
          console.error(`Error al eliminar usuario ${userId}:`, err);
          
          // ✅ Notificación de error al eliminar
          this.notificationService.error(`❌ Error al eliminar a ${userName}. Por favor, intenta de nuevo.`);
        }
      });
    }
  }
}