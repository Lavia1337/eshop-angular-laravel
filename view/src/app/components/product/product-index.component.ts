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

  searchKeyword: string = '';
  cartItemCount: number = 0;

  // User info
  isLoggedIn = false;
  user: any = null;
  isAdmin = false;

  // Product list
  products: Product[] = [];
  quantities: Record<number, number> = {};
  loading: boolean = true;

  // Categories
  categories: Category[] = [];
  selectedCategory: number = 0;

  // 1. Danh sách link ảnh cho Slider (Thay link của bạn vào đây)
  sliderImages: string[] = [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/iphone-17-1225-home.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/fold7-home-1225-v1.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/Redmi15Home-1225.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://dashboard.cellphones.com.vn/storage/macbook-giao-xa.png"
  ];

  // 2. Danh sách 2 ảnh nhỏ tĩnh bên dưới slider (nếu cần)
  subBanners: string[] = [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://dashboard.cellphones.com.vn/storage/a17-right-1125.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://dashboard.cellphones.com.vn/storage/macbook-giao-xa.png"
  ];


  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadCategories();
    this.loadProducts();

    // if (this.isLoggedIn) {
    //   this.updateCartCount();
    // }
  }

  // ======================
  // LOAD USER
  // ======================
  loadUser() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    this.isLoggedIn = !!token;

    if (userData) {
      this.user = JSON.parse(userData);
      this.isAdmin = this.user.role === 'admin';
    }
  }

  // ======================
  // LOAD CATEGORIES
  // ======================
  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Lỗi load danh mục:', err)
    });
  }

  // ======================
  // LOAD PRODUCTS
  // ======================
  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.products.forEach(p => {
          if (p.id !== undefined) this.quantities[p.id] = 1;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi load sản phẩm:', err);
        this.loading = false;
      }
    });
  }

  // ======================
  // FILTER BY CATEGORY
  // ======================
  filterByCategory(categoryId: number | null) {
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
      error: (err) => {
        console.error('Lỗi lọc sản phẩm:', err);
        this.loading = false;
      }
    });
  }

  // ======================
  // CART
  // ======================
  // updateCartCount() {
  //   this.cartService.getCart().subscribe({
  //     next: (data: any) => {
  //       const items = data.items || data;
  //       this.cartItemCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0);
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  addToCart(productId?: number) {
    if (!productId) return;

    if (!this.isLoggedIn) {
      alert('Bạn cần đăng nhập để mua hàng.');
      this.router.navigate(['/login']);
      return;
    }

    const quantity = this.quantities[productId] ?? 1;

    this.cartService.addToCart(productId, quantity).subscribe({
      next: () => {
        //alert('Đã thêm vào giỏ hàng!');
        // this.updateCartCount();
      },
      error: () => alert('Không thể thêm vào giỏ hàng!')
    });
  }

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
}
