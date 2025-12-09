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
  isLoggedIn: boolean = false;
  quantities: { [key: number]: number } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    this.productService.getById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        alert(err.error || 'Error loading product');
        this.loading = false;
      }
    });

    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
    this.isAdmin = user?.role === 'admin';
  }

  // Admin: Sửa sản phẩm
  edit(): void {
    if (!this.isAdmin) return alert('Bạn không có quyền sửa');
    if (!this.product || this.product.id === undefined) return;

    this.router.navigate(['/products/edit', this.product.id]);
  }

  // Admin: Xóa sản phẩm
  delete(): void {
    if (!this.isAdmin) return alert('Bạn không có quyền xóa');
    if (!this.product || this.product.id === undefined) return;

    this.productService.delete(this.product.id).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => alert(err.error || 'Error deleting product')
    });
  }

  // Thêm sản phẩm vào giỏ
  addToCart(productId?: number): void {
    if (!productId) return;

    const quantity = this.quantities[productId] ?? 1;

    this.cartService.addToCart(productId, quantity).subscribe({
      next: () => alert('Đã thêm vào giỏ hàng!'),
      error: (err) => {
        console.error('Lỗi thêm vào giỏ hàng:', err);
        alert('Không thể thêm vào giỏ hàng!');
      }
    });
  }

  // Quay lại danh sách sản phẩm
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
