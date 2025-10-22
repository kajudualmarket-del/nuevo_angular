// frontend/src/app/modules/user/user.service.ts (FINAL CORREGIDO Y COMPLETO)

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
  // CORRECTO: Mantiene la barra final para el listado (GET /api/v1/users/)
  private apiUrl = environment.apiUrl + '/api/v1/users/'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista completa de usuarios del backend.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Obtiene un usuario por ID (para edición).
   */
  getUserById(id: number): Observable<User> {
    // 🛑 Corrección: Quitamos la barra final del apiUrl para no tener un doble // en la URL.
    const baseEditUrl = this.apiUrl.slice(0, -1); 
    return this.http.get<User>(`${baseEditUrl}/${id}`);
  }

  /**
   * Actualiza un usuario existente (PUT).
   */
  updateUser(id: number, user: User): Observable<User> {
    // 🛑 Corrección: Quitamos la barra final del apiUrl.
    const baseEditUrl = this.apiUrl.slice(0, -1); 
    return this.http.put<User>(`${baseEditUrl}/${id}`, user); 
  }

  /**
   * Elimina un usuario por ID.
   */
  deleteUser(id: number): Observable<any> {
    // 🛑 Corrección CRÍTICA: Quitamos la barra final de this.apiUrl para prevenir el 404.
    const baseDeleteUrl = this.apiUrl.slice(0, -1); 
    return this.http.delete(`${baseDeleteUrl}/${id}`); 
  }
}