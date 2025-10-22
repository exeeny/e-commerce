<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\Contracts\OrderServiceInterface;
use Illuminate\Http\Request;

class OrderController extends Controller
{    
    private OrderServiceInterface $orderService;
    public function __construct(OrderServiceInterface $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index(Request $request)
    {
        $orders = $this->orderService->getOrders();
        return Inertia::render('orders', [
            'orders' => $orders
        ]);
    }
    public function store(Request $request)
    {
        try {
           $this->orderService->placeOrder();
        } catch (\Exception $exception) {
            return response()->json(['alert' => $exception->getMessage()], 422);
        }
        return redirect('/')->with('message', 'Order placed successfully');
    }
    public function clearHistory()
    {
        $this->orderService->clear_order_history();
        return redirect('/')->with('message', 'history was deleted successfully!');
    }
}
