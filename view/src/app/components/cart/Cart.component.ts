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
  isUpdating: boolean = false; // tránh spam click

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // ==========================
  // LOAD CART
  // ==========================
  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data: any) => {
        this.cartItems = data.items || data || [];
        this.calculateTotal();
      },
      error: err => {
        console.error('Lỗi load giỏ hàng:', err);
      }
    });
  }

  // ==========================
  // TÍNH TỔNG TIỀN
  // ==========================
  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + (item.quantity * item.product.price),
      0
    );
  }

  // ==========================
  // TĂNG / GIẢM SỐ LƯỢNG
  // ==========================
  changeQuantity(productId: number, newQuantity: number): void {
    if (newQuantity < 1 || this.isUpdating) return;

    this.isUpdating = true;

    this.cartService.updateQuantity(productId, newQuantity).subscribe({
      next: () => {
        const item = this.cartItems.find(
          i => i.product.id === productId
        );

        if (item) {
          item.quantity = newQuantity;
          this.calculateTotal();
        }

        this.isUpdating = false;
      },
      error: err => {
        console.error('Lỗi cập nhật số lượng:', err);
        this.isUpdating = false;
      }
    });
  }

  // ==========================
  // XOÁ SẢN PHẨM
  // ==========================
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        // Load lại cart để đồng bộ total + header
        this.loadCart();
      },
      error: err => {
        console.error('Lỗi xoá sản phẩm:', err);
      }
    });
  }
}
