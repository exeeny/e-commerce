<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\profileController;
use App\Http\Controllers\Settings\ProfileController as SettingsProfileController;

Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile/wallet', [SettingsProfileController::class, 'showWallet'])->name('show_wallet');
    Route::patch('/profile/wallet', [SettingsProfileController::class, 'updateWallet'])->name('update_wallet');
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('add_to_cart');
    Route::post('/cart/remove', [CartController::class, 'removeFromCart'])->name('remove_from_cart');
    Route::get('/cart', [CartController::class, 'showCart'])->name('cart_show');
    Route::delete('/cart/clear', [CartController::class, 'clearCart'])->name('clear_cart');
    Route::post('/order/make', [OrderController::class, 'store'] )->name('make_order');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    Route::delete('/orders/clear', [OrderController::class, 'clearHistory'])->name('clear_orders');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
