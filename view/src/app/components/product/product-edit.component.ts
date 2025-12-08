import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = { name: '', price: 0, description: '', image: '' };
  errors: any = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.productService.getById(id).subscribe(
      (data: Product) => this.product = data,
      (err: any) => alert(err.error || 'Error loading product')
    );
  }

  edit(): void {
    const id = +this.route.snapshot.params['id'];
    this.productService.edit(id, this.product).subscribe(
      () => this.router.navigateByUrl('/products'),
      (err: any) => alert(err.error || 'Error updating product')
    );
  }
}
