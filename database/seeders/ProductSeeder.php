<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Laptop',
            'price' => 999.99,
            'description' => 'A powerful laptop for work and gaming.',
            'image' => '/images/laptop.jpeg',
            'stock' => 10,
        ]);
    
        Product::create([
            'name' => 'Smartphone',
            'price' => 699.99,
            'description' => 'Latest model with advanced features.',
            'image' => '/images/smartphone.jpeg',
            'stock' => 25,
        ]);

        Product::create([
            'name' => 'HeadPhones',
            'price' => 239.99,
            'description' => 'Bluetooth over-ear headphones',
            'image' => '/images/headphones.jpeg',
            'stock' => 10,
        ]);
    
        Product::create([
            'name' => 'smart-watch',
            'price' => 450.99,
            'description' => 'A smartwatch with fitness tracking features.',
            'image' => '/images/smartwatch.jpeg',
            'stock' => 25,
        ]);


    }
}
