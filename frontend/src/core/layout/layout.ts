// frontend/src/app/core/layout/layout.ts (Corregido)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth';
import { NotificationComponent } from '../notification/notification'; // ✅ Importar componente de notificaciones

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent] // ✅ Agregar NotificationComponent
})
export class LayoutComponent {
  
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout(); // Llama al método del servicio para cerrar sesión
  }
}