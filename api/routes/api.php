<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (KHÔNG CẦN ĐĂNG NHẬP)
|--------------------------------------------------------------------------
*/

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Categories & Products (public)
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (CẦN TOKEN – auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
<<<<<<< HEAD
    Route::post('/cart', [CartController::class, 'add']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::delete('/cart/{productId}', [CartController::class, 'remove']);
=======

    /*
    |--------------------------------------------------------------------------
    | CART
    |--------------------------------------------------------------------------
    */
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::post('/cart/remove', [CartController::class, 'remove']);
>>>>>>> 698eda5 (them giam sat don hang)

    /*
    |--------------------------------------------------------------------------
    | ORDERS
    | - USER  : xem đơn của mình
    | - ADMIN : xem TẤT CẢ đơn
    |--------------------------------------------------------------------------
    */
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/checkout', [OrderController::class, 'checkout']);

    // ADMIN: cập nhật trạng thái đơn
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

    // ✅ ADMIN: CẬP NHẬT TOÀN BỘ ĐƠN HÀNG (SỬA 405)
    Route::put('/orders/{id}', [OrderController::class, 'update']);

    /*
    |--------------------------------------------------------------------------
    | REVIEWS
    |--------------------------------------------------------------------------
    */
    Route::post('/reviews', [ReviewController::class, 'store']);

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */
    Route::post('/logout', [AuthController::class, 'logout']);
});
