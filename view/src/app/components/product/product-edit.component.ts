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
    quantity: 0,
    category_id: 0
  };

  categories: Category[] = [];
  newImageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('ID không hợp lệ');
      this.router.navigate(['/products']);
      return;
    }

    this.categoryService.getAll().subscribe({
      next: (res) => this.categories = res
    });

    this.productService.getById(id).subscribe({
      next: (data) => {
        this.product = {
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: data.quantity ?? 0,
          category_id: data.category_id ?? data.category?.id ?? 0,
          images: data.images ?? []
        };
      }
    });
  }

  // =========================
  // MAIN IMAGE (FIX NG9)
  // =========================
  get mainImage(): string | null {
    return this.product.images?.length
      ? this.product.images[0].image_path
      : null;
  }

  edit(): void {
    if (!this.product.id) return;

    this.productService.edit(this.product.id, this.product).subscribe({
      next: () => {
        if (this.newImageUrl) {
          this.productService
            .addImageUrl(this.product.id!, this.newImageUrl)
            .subscribe(() => {
              alert('Cập nhật thành công');
              this.router.navigate(['/products']);
            });
        } else {
          alert('Cập nhật thành công');
          this.router.navigate(['/products']);
        }
      }
    });
  }

  delete(): void {
    if (!this.product.id) return;
    if (!confirm('Xóa sản phẩm?')) return;

    this.productService.delete(this.product.id).subscribe(() => {
      alert('Đã xóa');
      this.router.navigate(['/products']);
    });
  }
}
