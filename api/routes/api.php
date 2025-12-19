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
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// CATEGORIES & PRODUCTS
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // CART
    Route::post('/cart', [CartController::class, 'add']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::delete('/cart/{productId}', [CartController::class, 'remove']);

    // ORDERS
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/checkout', [OrderController::class, 'checkout']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);

    // ======================
    // PRODUCT IMAGES (ADMIN)
    // ======================
    Route::post(
        '/products/{id}/images/url',
        [ProductController::class, 'storeImageUrl']
    );

    // REVIEWS
    Route::post('/reviews', [ReviewController::class, 'store']);

    // LOGOUT
    Route::post('/logout', [AuthController::class, 'logout']);
});
