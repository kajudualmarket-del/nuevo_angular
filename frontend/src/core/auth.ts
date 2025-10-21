// frontend/src/app/core/auth.ts (LIMPIADO Y CORREGIDO)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ✅ URL CORREGIDA: Usa localhost y el puerto 8006, ya que el navegador es el que hace la petición.
  private API_URL = 'http://localhost:8006/api/v1/auth'; 

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => { 
        localStorage.setItem('token', response.token); 
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }
}