// frontend/src/app/modules/user/user.service.ts (FINAL CORREGIDO)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

// Interfaz para el modelo de usuario
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // CORRECCIÓN CRÍTICA: Se añade la barra diagonal (/) al final 
  // para coincidir con la ruta del Backend (main.py + users.py: /api/v1/users/)
  private apiUrl = environment.apiUrl + '/api/v1/users/'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista completa de usuarios del backend (Ruta protegida por JWT).
   */
  getUsers(): Observable<User[]> {
    // La URL ahora es correcta: http://localhost:8006/api/v1/users/
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Elimina un usuario por ID.
   */
  deleteUser(id: number): Observable<any> {
    // Para la eliminación, el / del id se añade a la URL base correctamente: .../users/1
    return this.http.delete(`${this.apiUrl}${id}`); 
  }
}