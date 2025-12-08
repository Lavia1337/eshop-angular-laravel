import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit {

  // Các biến mới cho Header
  searchKeyword: string = '';

  // -----------------------------
  // USER LOGIN INFO
  // -----------------------------
  isLoggedIn = false;
  user: any = null;
  isAdmin = false;



  // -----------------------------
  // PRODUCT LIST
  // -----------------------------
  products: Product[] = [];
  quantities: Record<number, number> = {};

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadProducts();
  }

  // ============================================================
  // LOAD USER INFO
  // ============================================================
  loadUser() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    this.isLoggedIn = !!token;

    if (userData) {
      this.user = JSON.parse(userData);
      this.isAdmin = this.user.role === 'admin';
    }
  }

  addProductModal() {
    this.router.navigate(['/admin/products/create']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.isLoggedIn = false;
    this.isAdmin = false;
    this.user = null;

    this.router.navigate(['/products']);
  }

  // ============================================================
  // NAVIGATION
  // ============================================================
  goHome() { this.router.navigate(['/products']); }
  goLogin() { this.router.navigate(['/login']); }
  goRegister() { this.router.navigate(['/register']); }
  goCart() { this.router.navigate(['/cart']); }
  goAdmin() { this.router.navigate(['/admin/products/create']); }

  // ============================================================
  // LOAD PRODUCT LIST
  // ============================================================
  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;

        // Gán số lượng mặc định = 1
        this.products.forEach(p => {
          if (p.id) {
            this.quantities[p.id] = 1;
          }
        });
      },
      error: err => {
        console.error('Lỗi load sản phẩm:', err);
      }
    });
  }

  // ============================================================
  // VIEW DETAIL
  // ============================================================
  viewProduct(id?: number): void {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }

  // ============================================================
  // ADD TO CART
  // ============================================================
  addToCart(productId?: number): void {
    if (!productId) return;

    if (!this.isLoggedIn) {
      alert('Bạn cần đăng nhập để mua hàng.');
      this.router.navigate(['/login']);
      return;
    }

    const quantity = this.quantities[productId] ?? 1;

    this.cartService.addToCart(productId, quantity).subscribe({
      next: () => {
        alert('Đã thêm vào giỏ hàng!');
      },
      error: err => {
        console.error('Lỗi thêm vào giỏ hàng:', err);
        alert('Không thể thêm vào giỏ hàng!');
      }
    });
  }

}
