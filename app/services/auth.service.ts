// src/app/auth/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/auth/login`, loginData);

  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/profile`);
  }
}
