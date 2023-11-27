import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:8087/auth/user/';

  registerUser(data) {
    return this.http.post(this.url + 'register', data);
  }

  loginUser(data) {
    return this.http.post(this.url + 'login', data);
  }

  setToken(token) {
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  removeToken() {
    localStorage.removeItem('jwtToken');
  }

  tokenExpired(token: string) {
    if (token == null) {
      return true;
    }
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
