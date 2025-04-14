<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('home' , [
            'products' => $products
        ]);
    }
    public function show(Product $product)
    {
        $product = Product::findOrFail($product->id);
        return Inertia::render('product/show' , [
            'product' => $product
        ]);
    }

}
