import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit {

  searchKeyword = '';
  cartItemCount = 0;

  // USER
  isLoggedIn = false;
  user: any = null;
  isAdmin = false;

  // PRODUCTS
  products: Product[] = [];
  quantities: Record<number, number> = {};
  loading = true;

  // CATEGORIES
  categories: Category[] = [];
  selectedCategory = 0;

  // SLIDER
  sliderImages: string[] = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/iphone-17-1225-home.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/fold7-home-1225-v1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://dashboard.cellphones.com.vn/storage/Redmi15Home-1225.png'
  ];

  subBanners: string[] = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://dashboard.cellphones.com.vn/storage/a17-right-1125.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://dashboard.cellphones.com.vn/storage/macbook-giao-xa.png'
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadCategories();
    this.loadProducts();
  }

  // ======================
  // USER
  // ======================
  loadUser(): void {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    this.isLoggedIn = !!token;

    if (userData) {
      this.user = JSON.parse(userData);
      this.isAdmin =
        typeof this.user.role === 'string' &&
        this.user.role.toLowerCase() === 'admin';
    }
  }

  // ======================
  // CATEGORIES
  // ======================
  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  // ======================
  // PRODUCTS
  // ======================
  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(p => {
          if (p.id !== undefined) {
            this.quantities[p.id] = 1;
          }
        });
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategory = categoryId ?? 0;

    if (!categoryId) {
      this.loadProducts();
      return;
    }

    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data.filter(p => p.category_id === categoryId);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // ======================
  // IMAGE SAFE GETTER
  // ======================
  getMainImage(product: Product): string {
    return product.images?.[0]?.image_path ?? 'assets/no-image.png';
  }

  // ======================
  // CART
  // ======================
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // updateCartCount() {
  //   this.cartService.getCart().subscribe({
  //     next: (data: any) => {
  //       const items = data.items || data;
  //       this.cartItemCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0);
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }
=======
=======
>>>>>>> 698eda5 (them giam sat don hang)
  updateCartCount(): void {
    this.cartService.getCart().subscribe({
      next: (data: any) => {
        const items = data.items || data;
        this.cartItemCount = items.reduce(
          (acc: number, item: any) => acc + item.quantity,
          0
        );
      },
      error: (err) => console.error(err)
    });
  }
>>>>>>> 698eda5 (them giam sat don hang)
=======

>>>>>>> 13998e8 (Resolve merge conflicts in routing and component files; update header and product index components for improved navigation and styling.)

=======
>>>>>>> 2829bbb (them giam sat don hang)
=======
>>>>>>> deb530a88034b9a5841ab402876465145cc07c5b
  addToCart(productId?: number): void {
    if (!productId) return;

    if (!this.isLoggedIn) {
      alert('Bạn cần đăng nhập để mua hàng.');
      this.router.navigate(['/login']);
      return;
    }

    const qty = this.quantities[productId] ?? 1;

    this.cartService.addToCart(productId, qty).subscribe({
      error: () => alert('Không thể thêm vào giỏ hàng')
    });
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  viewProduct(id?: number) {
    if (id) this.router.navigate(['/products', id]);
  }

  // ======================
  // NAVIGATION
  // ======================
  // goHome() { this.router.navigate(['/products']); }
  // goLogin() { this.router.navigate(['/login']); }
  // goCart() { this.router.navigate(['/cart']); }
  // addProductModal() { this.router.navigate(['/admin/products/create']); }

  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.isLoggedIn = false;
  //   this.user = null;
  //   this.cartItemCount = 0;
  //   this.router.navigate(['/products']);
  // }
=======
  // ======================
  // NAVIGATION
  // ======================
  goHome(): void {
    this.router.navigate(['/products']);
  }

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  goCart(): void {
    this.router.navigate(['/cart']);
  }

  // ✅ PHÂN QUYỀN XEM ĐƠN HÀNG
  goOrders(): void {
    if (!this.isLoggedIn || !this.user) {
      alert('Bạn cần đăng nhập để xem đơn hàng');
      this.router.navigate(['/login']);
      return;
    }

    if (this.isAdmin) {
      this.router.navigate(['/admin/orders']);
    } else {
      this.router.navigate(['/orders']);
    }
  }

  addProductModal(): void {
    this.router.navigate(['/admin/products/create']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.user = null;
    this.isAdmin = false;
    this.cartItemCount = 0;
    this.router.navigate(['/products']);
  }

  viewProduct(id?: number): void {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }
>>>>>>> 698eda5 (them giam sat don hang)
=======
=======

  viewProduct(id?: number) {
    if (id) this.router.navigate(['/products', id]);
  }

>>>>>>> 13998e8 (Resolve merge conflicts in routing and component files; update header and product index components for improved navigation and styling.)
  // ======================
  // NAVIGATION
  // ======================
  goHome(): void {
    this.router.navigate(['/products']);
  }

<<<<<<< HEAD
  goLogin(): void {
    this.router.navigate(['/login']);
  }

  goCart(): void {
    this.router.navigate(['/cart']);
  }

  // ✅ PHÂN QUYỀN XEM ĐƠN HÀNG
  goOrders(): void {
    if (!this.isLoggedIn || !this.user) {
      alert('Bạn cần đăng nhập để xem đơn hàng');
      this.router.navigate(['/login']);
      return;
    }

    if (this.isAdmin) {
      this.router.navigate(['/admin/orders']);
    } else {
      this.router.navigate(['/orders']);
    }
  }

  addProductModal(): void {
    this.router.navigate(['/admin/products/create']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.user = null;
    this.isAdmin = false;
    this.cartItemCount = 0;
    this.router.navigate(['/products']);
  }

  viewProduct(id?: number): void {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }
>>>>>>> 698eda5 (them giam sat don hang)
=======
  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.isLoggedIn = false;
  //   this.user = null;
  //   this.cartItemCount = 0;
  //   this.router.navigate(['/products']);
  // }

>>>>>>> 13998e8 (Resolve merge conflicts in routing and component files; update header and product index components for improved navigation and styling.)
=======
  viewProduct(id?: number): void {
    if (id) this.router.navigate(['/products', id]);
  }
>>>>>>> 2829bbb (them giam sat don hang)
=======
  viewProduct(id?: number): void {
    if (id) this.router.navigate(['/products', id]);
  }
>>>>>>> deb530a88034b9a5841ab402876465145cc07c5b
}
