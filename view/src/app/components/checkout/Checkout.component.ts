import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './Checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  address: string = '';
  paymentMethod: string = 'COD';
  total: number = 0;
  cartItems: any[] = [];

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data: any) => {
      this.cartItems = data.items;
      this.total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    });
  }

  checkout() {
    const data = {
      address: this.address,
      payment_method: this.paymentMethod
    };

    this.orderService.checkout(data).subscribe(() => {
      alert('Đặt hàng thành công!');
      this.router.navigate(['/products']);
    });
  }
}
