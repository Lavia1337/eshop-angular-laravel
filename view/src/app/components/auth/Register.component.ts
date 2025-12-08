import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8000/api/register', data)
      .subscribe({
        next: (res: any) => {
          alert("Đăng ký thành công!");
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error(err);
          alert("Đăng ký thất bại! Email có thể đã tồn tại.");
        }
      });
  }
}
