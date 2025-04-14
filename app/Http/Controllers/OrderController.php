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
                return response()->json(['message' => 'Product not found'], 404);
            }

            $total += $product->price * $item->quantity;

        }

        // if user has enough balance
        if ($total > $user->balance){
            return response()->json(['message' => 'not enough balance'], 404);
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
        

        $user->balance -= $total;
        $user->save();
        
        $cart->delete();
        return response()->json(['message' => 'Order placed successfully']);
    }

    public function index()
    {
        return Inertia::render('orders');
    }

    public function getOrders(Request $request)
    {
        $orders = $request->user()->orders()->with('details.product')->get();
        
        return response()->json($orders);
    }

    public function clearHistory()
    {
        $user = Auth::user();
        $user->orders()->delete();

        return response()->json(['message' => 'history was deleted successfully!']);
    }
}
