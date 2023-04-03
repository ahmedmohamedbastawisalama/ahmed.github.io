import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = {
    name: '',
    email: '',
    company_id: 0,
  };
  is_login = false;
  constructor() {
    this.authenticate();
  }

  authenticate() {
    if (this.getAccessToken() && this.getRefreshToken()) {
      this.is_login = true;
    }
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  setLogin(data: any) {
    this.is_login = true;
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    this.setUser(data.user);
  }

  setUser(user: any) {
    this.user = user;
  }

  jwtDetails() {
    let decoder: any = {
      role_id: 0,
    };
    let token: any = this.getAccessToken();
    decoder = jwt_decode(token);
    return decoder;
  }

  logout() {
    localStorage.clear();
    this.is_login = false;
  }
}
