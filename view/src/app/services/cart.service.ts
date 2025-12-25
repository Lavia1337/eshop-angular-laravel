import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8000/api/cart';

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  // ==============================
  // GET CART
  // ==============================
  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHeaders()).pipe(
      tap(data => {
        const items = data.items || data || [];
        const count = items.reduce(
          (acc: number, item: any) => acc + Number(item.quantity),
          0
        );
        this.cartCountSubject.next(count);
      })
    );
  }

  // ==============================
  // ADD TO CART
  // ==============================
  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      { product_id: productId, quantity },
      this.getHeaders()
    ).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  // ==============================
  // REMOVE ITEM
  // ==============================
  removeFromCart(productId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${productId}`,
      this.getHeaders()
    ).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  // ==============================
  // UPDATE QUANTITY ✅ FIXED
  // ==============================
updateQuantity(productId: number, quantity: number): Observable<any> {
  return this.http.put<any>(
    `${this.apiUrl}/update`,
    { product_id: productId, quantity },
    this.getHeaders()
  ).pipe(
    tap(() => this.getCart().subscribe())
  );
}

}
