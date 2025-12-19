import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // ===============================
  // PRODUCT (KHÔNG CHỨA ẢNH)
  // ===============================
  product: Product = {
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    category_id: 0
  };

  // ===============================
  // IMAGE URL (LƯU VÀO product_images)
  // ===============================
  imageUrl: string = '';

  // ===============================
  // CATEGORIES
  // ===============================
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  // ===============================
  // INIT
  // ===============================
  ngOnInit(): void {
    this.loadCategories();
  }

  // ===============================
  // LOAD CATEGORY LIST
  // ===============================
  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Load categories error:', err)
    });
  }

  // ===============================
  // CREATE PRODUCT + IMAGE URL
  // ===============================
  create(): void {

    // Validate category
    if (!this.product.category_id || this.product.category_id === 0) {
      alert('Vui lòng chọn danh mục');
      return;
    }

    // Validate image URL (nếu có)
    if (this.imageUrl && !this.isValidUrl(this.imageUrl)) {
      alert('URL ảnh không hợp lệ');
      return;
    }

    // 1️⃣ CREATE PRODUCT
    this.productService.create(this.product).subscribe({
      next: (createdProduct) => {

        // 2️⃣ SAVE IMAGE URL (NẾU CÓ)
        if (this.imageUrl && createdProduct.id) {
          this.productService
            .addImageUrl(createdProduct.id, this.imageUrl)
            .subscribe({
              next: () => {
                alert('Thêm sản phẩm thành công!');
                this.router.navigate(['/products']);
              },
              error: () => {
                alert('Tạo sản phẩm thành công nhưng lỗi lưu ảnh');
                this.router.navigate(['/products']);
              }
            });

        } else {
          alert('Thêm sản phẩm thành công!');
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        alert(err.error?.message || 'Lỗi khi tạo sản phẩm');
      }
    });
  }

  // ===============================
  // URL VALIDATION
  // ===============================
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
