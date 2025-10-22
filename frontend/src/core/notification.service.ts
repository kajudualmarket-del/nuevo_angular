// frontend/src/core/notification.service.ts
// Servicio para gestionar notificaciones tipo toast

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();
  
  private notificationId = 0;

  constructor() {}

  /**
   * Muestra una notificación de éxito
   */
  success(message: string, duration: number = 3000): void {
    this.show(message, 'success', duration);
  }

  /**
   * Muestra una notificación de error
   */
  error(message: string, duration: number = 4000): void {
    this.show(message, 'error', duration);
  }

  /**
   * Muestra una notificación de información
   */
  info(message: string, duration: number = 3000): void {
    this.show(message, 'info', duration);
  }

  /**
   * Muestra una notificación de advertencia
   */
  warning(message: string, duration: number = 3500): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Muestra una notificación personalizada
   */
  private show(message: string, type: Notification['type'], duration: number): void {
    const notification: Notification = {
      id: ++this.notificationId,
      message,
      type,
      duration
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Auto-remover la notificación después del tiempo especificado
    setTimeout(() => {
      this.remove(notification.id);
    }, duration);
  }

  /**
   * Remueve una notificación específica
   */
  remove(id: number): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }

  /**
   * Limpia todas las notificaciones
   */
  clearAll(): void {
    this.notificationsSubject.next([]);
  }
}

