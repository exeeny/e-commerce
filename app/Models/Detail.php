<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{

    protected $fillable = [
        'order_id',  // If this is being assigned via mass-assignment
        'product_id',
        'quantity',
    ];
    
    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }

}
