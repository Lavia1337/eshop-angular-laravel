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
  loading = true;
  isAdmin = false;

  quantities: { [productId: number]: number } = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/products']);
      return;
    }

    // LOAD PRODUCT
    this.productService.getById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;

        if (data.id) {
          this.quantities[data.id] = 1;
        }
      },
      error: () => {
        alert('Không thể tải sản phẩm');
        this.loading = false;
      }
    });

    const user = this.authService.getCurrentUser() || this.getUserFromLocal();
    this.isAdmin = user?.role?.toLowerCase() === 'admin';
  }

  // =============================
  // SAFE MAIN IMAGE (STRICT MODE)
  // =============================
  get mainImage(): string | null {
    if (!this.product?.images || this.product.images.length === 0) {
      return null;
    }
    return this.product.images[0].image_path;
  }

  private getUserFromLocal(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  edit(): void {
    if (this.product?.id) {
      this.router.navigate(['/admin/products/edit', this.product.id]);
    }
  }

  delete(): void {
    if (!this.product?.id) return;

    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    this.productService.delete(this.product.id).subscribe({
      next: () => {
        alert('Xóa sản phẩm thành công');
        this.router.navigate(['/products']);
      }
    });
  }

  addToCart(productId?: number): void {
    if (!productId) return;

    const quantity = this.quantities[productId] ?? 1;

    this.cartService.addToCart(productId, quantity).subscribe({
      next: () => alert('Đã thêm vào giỏ hàng')
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
