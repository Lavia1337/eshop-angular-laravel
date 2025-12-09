import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ====== Interface cho hình ảnh ======
export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
}

// ====== Interface Product đầy đủ ======
export interface Product {
  id?: number;
  name: string;
  price: number;
  description?: string;

  // Hình ảnh chính (nếu có)
  image?: string;

  // Danh sách nhiều hình ảnh
  images?: ProductImage[];

  quantity?: number;

  category?: {
    id: number;
    name: string;
  };

  status?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  edit(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
