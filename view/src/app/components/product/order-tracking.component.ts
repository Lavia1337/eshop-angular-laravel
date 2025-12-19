import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  OrderService,
  Order,
  OrderStatus
} from '../../services/order.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {

  orders: Order[] = [];
  loading = true;
  isAdmin = false;

  // ======================
  // EDIT STATE (ADMIN)
  // ======================
  editingOrderId: number | null = null;
  editData: Partial<Order> = {};

  statusList: OrderStatus[] = [
    'pending',
    'shipping',
    'completed',
    'cancelled'
  ];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkPermission();
    this.loadOrders();
  }

  /* ======================
     CHECK ROLE
  ====================== */
  private checkPermission(): void {
    const userData = localStorage.getItem('user');

    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userData);
    this.isAdmin = user.role === 'admin';
  }

  /* ======================
     LOAD ORDERS
     - USER  → đơn của mình
     - ADMIN → tất cả đơn
     (BACKEND xử lý)
  ====================== */
  private loadOrders(): void {
    this.loading = true;

    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Không thể tải danh sách đơn hàng');
      }
    });
  }

  /* ======================
     EDIT MODE (ADMIN)
  ====================== */
  startEdit(order: Order): void {
    this.editingOrderId = order.id;
    this.editData = {
      status: order.status,
      payment_method: order.payment_method,
      shipping_address: order.shipping_address,
      total: order.total
    };
  }

  cancelEdit(): void {
    this.editingOrderId = null;
    this.editData = {};
  }

  saveEdit(order: Order): void {
    if (!this.editingOrderId) return;

    this.orderService.updateOrder(order.id, this.editData).subscribe({
      next: () => {
        Object.assign(order, this.editData); // cập nhật UI
        this.cancelEdit();
      },
      error: () => {
        alert('Cập nhật đơn hàng thất bại');
      }
    });
  }

  /* ======================
     UI HELPERS
  ====================== */
  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case 'pending':
        return 'badge bg-secondary';
      case 'shipping':
        return 'badge bg-warning text-dark';
      case 'completed':
        return 'badge bg-success';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }
}
