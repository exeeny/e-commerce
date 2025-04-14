<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\profileController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/home', [ProductController::class, 'index'])->name('main');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/profile/wallet', [profileController::class, 'showWallet']);
    Route::put('/profile/wallet', [profileController::class, 'updateWallet']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::post('/cart/remove', [CartController::class, 'removeFromCart']);
    Route::get('/getCart', [CartController::class, 'getCartItems']);
    Route::get('/cart', [CartController::class, 'showCart']);
    Route::post('/cart/clear', [CartController::class, 'clearCart']);
    Route::post('/order/make', [OrderController::class, 'store'] );
    Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    Route::get('/getOrders', [OrderController::class, 'getOrders']);
    Route::post('/orders/clear', [OrderController::class, 'clearHistory']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
