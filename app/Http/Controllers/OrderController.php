<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $cart = $user->cart;
        $cartItems = $cart->details;
        $total = 0;

        foreach ($cartItems as $item){
            $product = Product::find($item->product_id);
            // if product exists
            if (!$product) {
                return back()->with('message', 'Product not found');
            }
            $total += $product->price * $item->quantity;
        }

        // if user has enough balance
        if ($total > $user->balance){
            return back()->with('message', 'not enough balance!', );
        }

        $order = $user->orders()->create();
        $orderDetails = [];

        foreach ($cartItems as $item){
            $product = Product::find($item->product_id);
            $product->stock -= $item->quantity;
            $product->save();

            $orderDetails[] = [
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        $order->details()->createMany($orderDetails);
        $user->balance = round($user->balance - $total, 2);
        
        $user->save();
        $cart->delete();
        return redirect('/')->with('message', 'Order placed successfully');
    }

    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('details.product')->get();
        return Inertia::render('orders', [
            'orders' => $orders
        ]);
    }

    public function clearHistory()
    {
        $user = Auth::user();
        $user->orders()->delete();
        return redirect('/')->with('message', 'history was deleted successfully!');
    }
}
