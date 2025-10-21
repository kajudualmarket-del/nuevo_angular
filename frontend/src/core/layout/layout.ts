// frontend/src/app/core/layout/layout.ts (Corregido)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Añadido
import { RouterModule } from '@angular/router'; // ✅ Añadido
import { AuthService } from '../auth'; // ✅ RUTA CORREGIDA (sube un nivel)

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: true,
  // Se añaden los módulos necesarios para que funcione el template y el router.
  imports: [CommonModule, RouterModule] 
})
export class LayoutComponent {
  
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout(); // Llama al método del servicio para cerrar sesión
  }
}