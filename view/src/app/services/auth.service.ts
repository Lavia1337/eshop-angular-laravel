import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Giả sử thông tin user được lưu trong localStorage
  getCurrentUser(): { role: string, username: string } | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  // Ví dụ login lưu thông tin user
  login(user: { username: string, role: string }) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
