import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Tạo headers chuẩn có Token + Content-Type
  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  // Lấy giỏ hàng
  getCart() {
    return this.http.get(`${this.apiUrl}/cart`, this.getHeaders());
  }

  // Thêm vào giỏ hàng
  addToCart(product_id: number, quantity: number) {
    return this.http.post(
      `${this.apiUrl}/cart/add`,
      { product_id, quantity },
      this.getHeaders()
    );
  }

  // Xoá khỏi giỏ hàng
  removeFromCart(productId: number) {
    return this.http.post(
      `${this.apiUrl}/cart/remove`,
      { product_id: productId },
      this.getHeaders()
    );
  }

  // Cập nhật số lượng
  updateQuantity(productId: number, quantity: number) {
    return this.http.post(
      `${this.apiUrl}/cart/update`,
      { product_id: productId, quantity },
      this.getHeaders()
    );
  }
}
