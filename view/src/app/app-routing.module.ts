import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* ===== USER ===== */
import { ProductIndexComponent } from './components/product/product-index.component';
import { ProductDetailComponent } from './components/product/product-detail.component';
import { CartComponent } from './components/cart/Cart.component';
import { CheckoutComponent } from './components/checkout/Checkout.component';
import { LoginComponent } from './components/auth/Login.component';
import { RegisterComponent } from './components/auth/Register.component';

/* ===== ORDERS ===== */
import { OrderTrackingComponent } from './components/product/order-tracking.component';
// import { OrderDetailComponent } from './components/orders/order-detail.component';

/* ===== ADMIN ===== */
import { ProductCreateComponent } from './components/product/product-create.component';
import { ProductEditComponent } from './components/product/product-edit.component';
import { ProductDeleteComponent } from './components/product/product-delete.component';

const routes: Routes = [
<<<<<<< HEAD
  /* ===== DEFAULT ===== */
  { path: '', redirectTo: 'login', pathMatch: 'full' },
=======
  // Khi chạy ứng dụng, tự động chuyển đến trang sản phẩm
  { path: '', redirectTo: 'products', pathMatch: 'full' },
>>>>>>> 99972c2b0c7891885cc7bb9b1b6476431ac416ce

  /* ===== AUTH ===== */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /* ===== USER ===== */
  { path: 'products', component: ProductIndexComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },

  /* ===== ORDERS ===== */
  { path: 'orders', component: OrderTrackingComponent },        // USER
  { path: 'admin/orders', component: OrderTrackingComponent },  // ADMIN

  /* ===== ADMIN PRODUCTS ===== */
  { path: 'admin/products/create', component: ProductCreateComponent },
  { path: 'admin/products/edit/:id', component: ProductEditComponent },
  { path: 'admin/products/delete/:id', component: ProductDeleteComponent },

  /* ===== WILDCARD ===== */
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
