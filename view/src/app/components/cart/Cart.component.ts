import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data: any) => {
        this.cartItems = data.items || data;  // hỗ trợ cả 2 dạng API
        this.calculateTotal();
      },
      error: err => {
        console.error("Lỗi load giỏ hàng:", err);
      }
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.quantity * item.product.price);
    }, 0);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.loadCart();
      },
      error: err => {
        console.error("Lỗi xoá sản phẩm:", err);
      }
    });
  }
}
