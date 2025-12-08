import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  price: number;
  description?: string;
  image?: string;

  // Thuộc tính thêm
  category?: { id: number; name: string };
  status?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ✔️ Sửa lại URL đúng với Laravel API
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Lấy 1 sản phẩm theo id
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Thêm sản phẩm
  create(data: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  // Cập nhật sản phẩm
  edit(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  // Xóa sản phẩm
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
