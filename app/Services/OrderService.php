<?php

namespace App\Services;

use App\Models\Product;
use App\Services\Contracts\CartServiceInterface;
use App\Services\Contracts\OrderServiceInterface;
use Exception;
use Illuminate\Support\Facades\Auth;

class OrderService implements OrderServiceInterface
{
    protected CartServiceInterface $cartService;
    public function __construct(CartServiceInterface $cartService)
    {
        $this->cartService = $cartService;
    }

    public function getOrders(){
        return Auth::user()->orders()->with('details.product')->get();
    }

    public function placeOrder()
    {
        $user = Auth::user();
        $cart = $this->cartService->getProductsInCart();
        $total = $this->cartService->getTotal();

        if ($total > $user->balance) {
            throw new Exception('Not enough balance!');
        }

        $order = $user->orders()->create();
        foreach ($cart->details as $item){
            $product = Product::find($item->product_id);
            $product->stock -= $item->quantity;
            $product->save();
            $orderDetails[] = [
                'product_id' => $item->product_id,
                'quantity' => $item->quantity
            ];
        }

        $order->details()->createMany($orderDetails);
        $user->balance = round($user->balance - $total, 2);
        $user->save();
        $this->cartService->clearCart();
    }

    public function clear_order_history(){
        $user = Auth::user();
        $user->orders()->delete();
    }
}

