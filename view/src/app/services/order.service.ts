import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  checkout(data: any) {
    return this.http.post(`${this.api}/checkout`, data);
  }

  getOrders() {
    return this.http.get(`${this.api}/orders`);
  }
}
