<?php

namespace App\Services\Contracts;

interface OrderServiceInterface
{
    public function placeOrder();
    public function clear_order_history();
    public function getOrders();
}
