import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8000/api/login', data)
      .subscribe({
        next: (res: any) => {

          if (!res.token || !res.user) {
            alert("Login API không trả về token hoặc user!");
            return;
          }

          // 🔥 Lưu token
          localStorage.setItem('token', res.token);

          // 🔥 Lưu user (role, id, name ...)
          localStorage.setItem('user', JSON.stringify(res.user));

          //          alert("Đăng nhập thành công!");


          this.router.navigate(['/products']);

        },
        error: err => {
          console.error("Login error:", err);
          alert("Sai email hoặc mật khẩu!");
        }
      });
  }
  goHome() { this.router.navigate(['/products']); }
}
