import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs'; // 1. Import thêm BehaviorSubject, tap

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8000/api/cart';

  // 2. Tạo một biến Subject để lưu trữ số lượng (Mặc định là 0)
  private cartCountSubject = new BehaviorSubject<number>(0);

  // 3. Biến này để các Component khác (như Header) đăng ký lắng nghe
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) { }

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
  // 4. Sửa hàm lấy giỏ hàng: Lấy xong thì cập nhật luôn số lượng vào Subject
  getCart(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(data => {

        // Tính toán số lượng từ dữ liệu trả về
        const items = data.items || [];
        const count = items.reduce((acc: number, item: any) => acc + Number(item.quantity), 0);

        // Cập nhật số lượng mới vào Subject => Header sẽ tự nhảy số
        this.cartCountSubject.next(count);
      })
    );
  }

  // Thêm vào giỏ hàng
  // 5. Sửa hàm thêm vào giỏ: Thêm xong thì gọi lại getCart để cập nhật số mới
  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { product_id: productId, quantity }).pipe(
      tap(() => {
        // Sau khi thêm thành công, gọi lại getCart để cập nhật số lượng mới nhất
        this.getCart().subscribe();
      })
    );
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number): Observable<any> {
    // Kết quả URL sẽ là: http://localhost:8000/api/cart/123
    return this.http.delete<any>(`${this.apiUrl}/${productId}`).pipe(
      // 👇 QUAN TRỌNG: Xóa xong phải cập nhật lại số lượng trên Header
      tap(() => {
        this.getCart().subscribe();
      })
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
