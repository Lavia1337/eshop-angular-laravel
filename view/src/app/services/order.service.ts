import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/* =====================================================
   TYPES
===================================================== */

export type OrderStatus =
  | 'pending'
  | 'shipping'
  | 'completed'
  | 'cancelled';

/* =====================================================
   INTERFACES – KHỚP BACKEND
===================================================== */

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: OrderStatus;
  shipping_address: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

/* =====================================================
   SERVICE
===================================================== */

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* =====================================================
     AUTH HEADER
  ===================================================== */
  private authHeader() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      })
    };
  }

  /* =====================================================
     USER + ADMIN (BACKEND XỬ LÝ ROLE)
  ===================================================== */

  // 🔹 Lấy danh sách đơn hàng
  // - USER  → đơn của mình
  // - ADMIN → tất cả đơn
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.api}/orders`,
      this.authHeader()
    );
  }

  // 🔹 Chi tiết 1 đơn hàng
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(
      `${this.api}/orders/${id}`,
      this.authHeader()
    );
  }

  // 🔹 Checkout
  checkout(data: {
    address: string;
    payment_method: string;
  }): Observable<any> {
    return this.http.post(
      `${this.api}/orders/checkout`,
      data,
      this.authHeader()
    );
  }

  /* =====================================================
     ADMIN ONLY
  ===================================================== */

  // 🔹 Cập nhật TRẠNG THÁI
  updateOrderStatus(
    id: number,
    status: OrderStatus
  ): Observable<any> {
    return this.http.put(
      `${this.api}/orders/${id}/status`,
      { status },
      this.authHeader()
    );
  }

  // 🔹 Cập nhật TOÀN BỘ đơn hàng
  updateOrder(
    id: number,
    data: Partial<Pick<
      Order,
      'status' | 'payment_method' | 'shipping_address' | 'total'
    >>
  ): Observable<any> {
    return this.http.put(
      `${this.api}/orders/${id}`,
      data,
      this.authHeader()
    );
  }
}
