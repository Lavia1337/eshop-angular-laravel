import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0,
    description: '',
    image: '',
    quantity: 0,
    category_id: 0
  };

  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Load categories
    this.categoryService.getAll().subscribe({
      next: (cat) => this.categories = cat,
      error: (err) => console.error('Lỗi load danh mục:', err)
    });

    // Load product details
    this.productService.getById(id).subscribe({
      next: (data) => {
        this.product = {
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image,
          quantity: data.quantity ?? 0,
          category_id: data.category_id ?? data.category?.id ?? 0
        };
      },
      error: (err) => console.error('Lỗi load sản phẩm:', err)
    });
  }

  // =============================================
  // UPDATE PRODUCT
  // =============================================
  edit(): void {
    if (!this.product.id) {
      alert('Không tìm thấy ID sản phẩm.');
      return;
    }

    this.productService.edit(this.product.id, this.product).subscribe({
      next: () => {
        alert('Cập nhật sản phẩm thành công!');
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        alert(err.error?.message || 'Lỗi khi cập nhật sản phẩm');
      }
    });
  }

  // =============================================
  // DELETE PRODUCT
  // =============================================
  delete(): void {
    if (!this.product.id) {
      alert('Không tìm thấy ID sản phẩm để xóa.');
      return;
    }

    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      return;
    }

    this.productService.delete(this.product.id).subscribe({
      next: () => {
        alert('Xóa sản phẩm thành công!');
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Lỗi khi xóa sản phẩm');
      }
    });
  }
}
