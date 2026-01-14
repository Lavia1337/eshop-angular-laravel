import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Product Components
=======
/* ===== PRODUCT ===== */
>>>>>>> deb530a88034b9a5841ab402876465145cc07c5b
import { HeaderComponent } from './components/product/header.component';
=======
/* ===== PRODUCT ===== */
>>>>>>> 698eda5 (them giam sat don hang)
=======
/* ===== PRODUCT ===== */
>>>>>>> 698eda5 (them giam sat don hang)
=======

=======
>>>>>>> deb530a (final fix)
/* ===== PRODUCT ===== */
import { HeaderComponent } from './components/product/header.component';
>>>>>>> 13998e8 (Resolve merge conflicts in routing and component files; update header and product index components for improved navigation and styling.)
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

/* ===== INTERCEPTOR ===== */
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
=======
    /* Product */
>>>>>>> 698eda5 (them giam sat don hang)
=======
=======

    /* Product */
>>>>>>> deb530a (final fix)
=======

    /* Product */
>>>>>>> deb530a88034b9a5841ab402876465145cc07c5b
    HeaderComponent,
>>>>>>> 13998e8 (Resolve merge conflicts in routing and component files; update header and product index components for improved navigation and styling.)
    ProductIndexComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent,

    /* Cart & Checkout */
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
    CommonModule,
    FormsModule
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
export class AppModule { }
