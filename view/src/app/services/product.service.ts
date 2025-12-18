import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ====================================================================
// Interface cho hình ảnh của sản phẩm
// ====================================================================
export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
}

// ====================================================================
// Interface Product đầy đủ
// ====================================================================
export interface Product {

  id?: number;
  name: string;
  price: number;

  description?: string;
  quantity?: number;

  // Ảnh đại diện (tùy API)
  image?: string;

  // Nhiều ảnh (gallery)
  images?: ProductImage[];

  // Object category khi load từ backend
  category?: {
    id: number;
    name: string;
  };

  // CATEGORY ID – bắt buộc khi CREATE/EDIT
  category_id: number;

  status?: boolean;
}

// ====================================================================
// SERVICE
// ====================================================================
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  // Lấy tất cả sản phẩm
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Lấy theo ID
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Tạo sản phẩm
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
