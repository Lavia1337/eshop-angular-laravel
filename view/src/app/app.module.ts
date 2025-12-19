import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

<<<<<<< HEAD
/* ===== PRODUCT ===== */
=======
// Product Components
import { HeaderComponent } from './components/product/header.component';
>>>>>>> 99972c2b0c7891885cc7bb9b1b6476431ac416ce
import { ProductIndexComponent } from './components/product/product-index.component';
import { ProductDetailComponent } from './components/product/product-detail.component';
import { ProductCreateComponent } from './components/product/product-create.component';
import { ProductEditComponent } from './components/product/product-edit.component';
import { ProductDeleteComponent } from './components/product/product-delete.component';

/* ===== CART & CHECKOUT ===== */
import { CartComponent } from './components/cart/Cart.component';
import { CheckoutComponent } from './components/checkout/Checkout.component';

/* ===== AUTH ===== */
import { LoginComponent } from './components/auth/Login.component';
import { RegisterComponent } from './components/auth/Register.component';

/* ===== ORDERS ===== */
import { OrderTrackingComponent } from './components/product/order-tracking.component';
// Nếu bạn tách folder orders sau này:
// import { OrderTrackingComponent } from './components/orders/order-tracking.component';

/* ===== INTERCEPTOR ===== */
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD

    /* Product */
=======
    HeaderComponent,
>>>>>>> 99972c2b0c7891885cc7bb9b1b6476431ac416ce
    ProductIndexComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent,

    /* Cart */
    CartComponent,
    CheckoutComponent,

    /* Auth */
    LoginComponent,
    RegisterComponent,

    /* Orders */
    OrderTrackingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
