import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  images: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getById(id).subscribe((data: any) => {
      this.product = data;
      this.images = data.images.map((img: any) => 'http://localhost:8000/storage/' + img.image_url);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product.id).subscribe(() => {
      alert('Đã thêm vào giỏ hàng!');
    });
  }
}
