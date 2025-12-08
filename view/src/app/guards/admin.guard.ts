import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('role'); // giả sử role lưu 'admin' hoặc 'user'
    if (userRole === 'admin') {
      return true;
    } else {
      alert('Bạn không có quyền truy cập trang này!');
      this.router.navigate(['/product']);
      return false;
    }
  }
}
