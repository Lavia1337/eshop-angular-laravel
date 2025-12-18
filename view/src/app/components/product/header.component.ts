import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import service

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  user: any = null;
  isAdmin = false;

  cartItemCount: number = 0; // Biến hiển thị trên HTML

  constructor(
    private router: Router,
    private cartService: CartService // Inject Service
  ) { }

  ngOnInit(): void {
    this.loadUser();

    // 1. Đăng ký lắng nghe sự thay đổi của giỏ hàng
    // Bất cứ khi nào cartCountSubject bên Service thay đổi, dòng này sẽ chạy
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    // 2. Gọi API lần đầu để lấy số lượng khi vừa vào trang (nếu đã login)
    if (this.isLoggedIn) {
      this.cartService.getCart().subscribe();
    }
  }

  // ✔ Load thông tin user từ localStorage
  loadUser() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    this.isLoggedIn = !!token;               // true nếu có token
    this.user = userData ? JSON.parse(userData) : null;
    this.isAdmin = this.user?.role === 'admin';
  }

  // ✔ Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.user = null;

    this.router.navigate(['/']);
  }

  // ✔ Điều hướng về trang chủ
  goHome() {
    this.router.navigate(['/']);
  }

  // ✔ Điều hướng sang đăng nhập
  goLogin() {
    this.router.navigate(['/login']);
  }

  // ✔ Điều hướng sang đăng ký
  goRegister() {
    this.router.navigate(['/register']);
  }

  // ✔ Điều hướng sang giỏ hàng
  goCart() {
    this.router.navigate(['/cart']);
  }
}
