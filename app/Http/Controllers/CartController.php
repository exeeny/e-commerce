<?php

namespace App\Http\Controllers;
use App\Services\Contracts\CartServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    private CartServiceInterface $cartService;
    
    public function __construct(CartServiceInterface $cartService)
    {
        $this->cartService = $cartService;
    }

    private function cartResponse($message = null)
    {
    $cart = $this->cartService->getProductsInCart();
    $total = $this->cartService->getTotal();

    return response()->json([
        'message' => $message,
        'cart' => $cart,
        'total' => $total,
    ]);
    }

    public function showCart (){
        return Inertia::render('cart');
    }
    public function fetchCart() {
        return $this->cartResponse();
    }

    //add
    public function addToCart(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);
        try {
            $this->cartService->addToCart($productId, $quantity);
        } catch (\Exception $exception) {
            return response()->json(['alert' => $exception->getMessage()], 422);
        }
        return $this->cartResponse('Product added to cart successfully');
    }
    
    // remove
    public function removeFromCart(Request $request)
    {
        $productId = $request->input('product_id');
        $this->cartService->removeFromCart($productId);
        return $this->cartResponse('Product was removed from cart!');
    }

    public function clearCart(Request $request)
    {
        $this->cartService->clearCart();
        return redirect('/')->with('message','cart was cleared successfully!'); 
    }
}
