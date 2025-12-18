import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// User components
import { ProductIndexComponent } from './components/product/product-index.component';
import { ProductDetailComponent } from './components/product/product-detail.component';
import { CartComponent } from './components/cart/Cart.component';
import { CheckoutComponent } from './components/checkout/Checkout.component';
import { LoginComponent } from './components/auth/Login.component';
import { RegisterComponent } from './components/auth/Register.component';

// Admin components
import { ProductCreateComponent } from './components/product/product-create.component';
import { ProductEditComponent } from './components/product/product-edit.component';
import { ProductDeleteComponent } from './components/product/product-delete.component';

const routes: Routes = [
  // Khi chạy ứng dụng, tự động chuyển đến trang sản phẩm
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // User routes
  { path: 'products', component: ProductIndexComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin routes
  { path: 'admin/products/create', component: ProductCreateComponent },
  { path: 'admin/products/edit/:id', component: ProductEditComponent },
  { path: 'admin/products/delete/:id', component: ProductDeleteComponent },

  // Wildcard route
  { path: '**', redirectTo: 'Login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
