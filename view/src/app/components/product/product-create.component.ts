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

  product: Product = {
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    category_id: 0
  };

  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data,
      error: err => console.error(err)
    });
  }

  create(): void {
    if (!this.product.category_id || this.product.category_id === 0) {
      alert('Vui lòng chọn danh mục');
      return;
    }

    this.productService.create(this.product).subscribe({
      next: () => {
        alert('Thêm sản phẩm thành công!');
        this.router.navigate(['/products']);
      },
      error: err => alert(err.error?.message || 'Lỗi khi tạo sản phẩm')
    });
  }
}
