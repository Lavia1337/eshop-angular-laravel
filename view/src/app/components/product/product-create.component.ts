import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  // ✅ Không cần id vì interface đã cho phép optional
  product: Product = { name: '', price: 0, description: '', image: '' , quantity: 0};
  errors: any = {};

  constructor(private productService: ProductService, private router: Router) {}

  create(): void {
    this.productService.create(this.product).subscribe({
      next: () => {
        alert('Thêm sản phẩm thành công!');
        this.router.navigateByUrl('/products');
      },
      error: err => {
        console.error(err);
        alert(err.error?.message || 'Lỗi khi tạo sản phẩm');
      }
    });
  }
}
