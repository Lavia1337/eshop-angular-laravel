import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  loading: boolean = true;
  isAdmin: boolean = false;
  quantities: { [key: number]: number } = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    // Lấy thông tin product
    this.productService.getById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.loading = false;
        // Gán số lượng mặc định
        if (data.id) this.quantities[data.id] = 1;
      },
      error: (err) => {
        alert(err.error || 'Error loading product');
        this.loading = false;
      }
    });

    // Load user từ AuthService / localStorage
    const user = this.authService.getCurrentUser() || this.getUserFromLocal();
    this.isAdmin = user?.role?.toLowerCase() === 'admin';
  }

  // Nếu AuthService không trả về, fallback từ localStorage
  getUserFromLocal() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Admin: sửa sản phẩm
  edit(): void {
    if (!this.isAdmin) return alert('Bạn không có quyền sửa');
    if (!this.product?.id) return;

    this.router.navigate(['/admin/products/edit', this.product.id]);
  }

  // Admin: xóa sản phẩm
  delete(): void {
    if (!this.isAdmin) return alert('Bạn không có quyền xóa');
    if (!this.product?.id) return;

    this.productService.delete(this.product.id).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => alert(err.error || 'Error deleting product')
    });
  }

  // Thêm vào giỏ hàng
  addToCart(productId?: number): void {
    if (!productId) return;

    const quantity = this.quantities[productId] ?? 1;

    this.cartService.addToCart(productId, quantity).subscribe({
      next: () => alert('Đã thêm vào giỏ hàng!'),
      error: (err) => {
        console.error(err);
        alert('Không thể thêm vào giỏ hàng!');
      }
    });
  }

  // Quay lại danh sách
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
