<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Product;
use App\Services\Contracts\CartServiceInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class CartService implements CartServiceInterface
{

    private $user;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
       $this->user = Auth::user();
    }

    public function getProductsInCart()
    {
        return $this->user->cart()->with('details.product')
                ->first();     
    }

    public function getTotal()
    {
        $cart = $this->getProductsInCart();
        $total = 0;
        foreach ($cart->details as $item) {
            $total += $item->product->price * $item->quantity;
        }
        return $total;
    }

    public function addToCart($productId, $quantity)
    {
        $product = Product::findOrFail($productId);
        if ($product->stock < $quantity) {
            throw new \Exception('not enough stock!');
        }
        $cart = Cart::firstOrCreate(['user_id' => $this->user->id]);
        $cartItem = $cart->details()->where('product_id', $productId)->first();
        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $quantity;
            if ($product->stock < $newQuantity) {
                 throw new \Exception('Not enough stock available');
             }
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            CartDetail::create([
            'cart_id' => $cart->id,
            'product_id' => $productId,
            'quantity' => $quantity
        ]);
        }
    }

    public function removeFromCart($productId)
    {
        $cart = $this->user->cart;
        $cartItem = $cart->details()->where('product_id', $productId)->first();
        if($cartItem){
            $cartItem->quantity -= 1;
            $cartItem->save();
            if ($cartItem->quantity <= 0) {
                $cartItem->delete();
            }
        }
        return true;
    }

    public function clearCart()
    {
        $this->user->cart->delete();
    }
}


