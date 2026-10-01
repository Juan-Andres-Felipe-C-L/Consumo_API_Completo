
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../../features/auth/models/login-request.model';
import { LoginResponse } from '../../features/auth/models/login-response.model';
import { environment } from '../../../environments/environment';
import { User } from '../../features/auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private readonly dashboards: Record<string, string> = {
    ADMIN: '/admin',
    AGENT: '/agent',
    CLIENT: '/client'
  };

  getDashboardRoute(role: string | null = this.getRole()): string {
    return (role && this.dashboards[role.toUpperCase()]) || '/login';
  }

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/api/auth/login`,
      credentials
    );
  }

  saveSession(response: LoginResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }

    return JSON.parse(user) as User;
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}
