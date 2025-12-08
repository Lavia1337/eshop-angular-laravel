import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = { id: 0, name: '', price: 0, description: '', image: '' };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.productService.getById(id).subscribe({
      next: data => this.product = data,
      error: err => alert(err.error || 'Error loading product')
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/admin/product/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        next: () => this.router.navigate(['/products']),
        error: err => alert(err.error || 'Error deleting product')
      });
    }
  }
}
