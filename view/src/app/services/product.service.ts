import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ==================================================
// PRODUCT IMAGE
// ==================================================
export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
}

// ==================================================
// PRODUCT (KHÔNG CHỨA IMAGE URL)
// ==================================================
export interface Product {
  id?: number;
  name: string;
  price: number;

  description?: string;
  quantity?: number;

  // Gallery ảnh (load từ backend)
  images?: ProductImage[];

  // Category
  category?: {
    id: number;
    name: string;
  };

  category_id: number;
  status?: boolean;
}

// ==================================================
// SERVICE
// ==================================================
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  // ==========================
  // GET ALL
  // ==========================
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // ==========================
  // GET BY ID
  // ==========================
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // ==========================
  // CREATE PRODUCT
  // ==========================
  create(data: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  // ==========================
  // UPDATE PRODUCT
  // ==========================
  edit(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  // ==========================
  // DELETE PRODUCT
  // ==========================
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ==========================
  // ADD IMAGE URL → product_images
  // ==========================
  addImageUrl(productId: number, imageUrl: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${productId}/images/url`,
      { image_url: imageUrl }
    );
  }
}
