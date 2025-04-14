<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartDetail;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //add
    public function addToCart(Request $request)
    {
        $user = $request->user();

        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $product = Product::findOrFail($productId);

        if ($product->stock < $quantity) {
            return response()->json(['message' => 'Not enough stock available'], 400);
        }

        $cart = Cart::firstOrCreate(['user_id' => $user->id]);
        // No call to $user->save() needed



        // find first cart item, if item exists, update quantity
       $cartItem = CartDetail::where('cart_id', $cart->id)
                        ->where('product_id', $productId)
                        ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $quantity;

        // Check if new quantity exceeds stock
            if ($product->stock < $newQuantity) {
                return response()->json(['message' => 'Not enough stock available'], 400);
            }

            $cartItem->update(['quantity' => $newQuantity]);
        } else {
        
            CartDetail::create([
            'cart_id' => $cart->id,
            'product_id' => $productId,
            'quantity' => $quantity
        ]);
    }
    

    return response()->json(['message' => 'Product added to cart successfully']);
    }
    
    
    //remove
    public function removeFromCart(Request $request)
    {
        $cart = $request->user()->cart;

        $productId = $request->input('product_id');

        $cartItem = CartDetail::where('cart_id', $cart->id)
                        ->where('product_id', $productId)
                        ->first();
        if($cartItem){
            $cartItem->quantity -= 1;
            $cartItem->save();

            if ($cartItem->quantity <= 0) {
                $cartItem->delete();
            }
        }

        return response()->json(['cart' => $cart]);
    }


    //get cart items
    public function getCartItems(Request $request)
    {

        $cart = $request->user()->cart;
        $total = 0;

        foreach ($cart->details as $item) {
            $total += $item->product->price * $item->quantity;
        }

        $cartItems = $cart->details()->with('product')->get();


        return response()->json(['cart' => $cartItems, 'total' => $total]);
        
    }

    public function showCart()
    {
        return Inertia::render('cart');
    }

    //clear
    public function clearCart(Request $request)
    {
        $cart = $request->user()->cart();
        $cart->delete();

        return response()->json(['message' => 'cart was deleted successfully!']);
    }
    
}
