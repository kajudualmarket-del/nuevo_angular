// frontend/src/core/notification/notification.ts
// Componente para mostrar notificaciones tipo toast

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(
      notifications => this.notifications = notifications
    );
  }

  /**
   * Cierra una notificación manualmente
   */
  close(id: number): void {
    this.notificationService.remove(id);
  }

  /**
   * Retorna la clase CSS según el tipo de notificación
   */
  getNotificationClass(type: string): string {
    return `notification-${type}`;
  }

  /**
   * Retorna el icono según el tipo de notificación
   */
  getIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'success': '✓',
      'error': '✕',
      'warning': '⚠',
      'info': 'ℹ'
    };
    return icons[type] || 'ℹ';
  }
}

