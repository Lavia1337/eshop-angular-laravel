import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../services/auth.service'; // import AuthService

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = { name: '', price: 0, description: '', image: '' };
  loading: boolean = true;  // thêm biến này
  errors: any = {};
  isAdmin: boolean = false; // thêm biến kiểm tra admin

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // inject AuthService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    // Lấy thông tin sản phẩm
    this.productService.getById(id).subscribe({
  next: (data: Product) => {
    this.product = data;
    this.loading = false;
  },
  error: (err) => {
    alert(err.error || 'Error loading product');
    this.loading = false;
  },
  complete: () => {
    console.log('Request completed');
  }
});


    // Kiểm tra role người dùng
    const user = this.authService.getCurrentUser(); // giả sử trả về {role: 'admin' | 'user'}
    this.isAdmin = user?.role === 'admin';
  }

  edit(): void {
    if (!this.isAdmin) return alert('Bạn không có quyền sửa');
    const id = +this.route.snapshot.params['id'];
    this.productService.edit(id, this.product).subscribe(
      () => this.router.navigateByUrl('/products'),
      (err: any) => alert(err.error || 'Error updating product')
    );
  }

  delete(): void {
    if (!this.isAdmin) return alert('Bạn không có quyền xóa');
    const id = +this.route.snapshot.params['id'];
    this.productService.delete(id).subscribe(
      () => this.router.navigateByUrl('/products'),
      (err: any) => alert(err.error || 'Error deleting product')
    );
  }
}
