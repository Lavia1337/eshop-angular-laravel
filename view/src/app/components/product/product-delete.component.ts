import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  template: `<div class="container mt-4"><h2>Deleting...</h2></div>`
})
export class ProductDeleteComponent {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = +this.route.snapshot.params['id'];
    if (confirm('Are you sure to delete this product?')) {
      this.productService.delete(id).subscribe(
        () => this.router.navigateByUrl('/products'),
        err => alert(err.error || 'Error deleting product')
      );
    } else {
      this.router.navigateByUrl('/products');
    }
  }
}
