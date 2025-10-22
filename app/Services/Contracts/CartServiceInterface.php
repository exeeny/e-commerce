<?php

namespace App\Services\Contracts;

interface CartServiceInterface
{
    public function getProductsInCart();
    public function getTotal();
    public function removeFromCart($productId);
    public function addToCart($productId, $quantity);
    public function clearCart();
}
