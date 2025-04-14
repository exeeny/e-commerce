<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class profileController extends Controller
{
    public function showWallet() {
        return Inertia::render('profile/wallet');
    }

    public function updateWallet(Request $request) {
        $request->validate([
            'balance' => 'required|numeric|min:0',
        ]);
        
        $balance= $request->input('balance');

        $request->user()->balance += $balance;
        $request->user()->save();

        return response()->json(["message" => "Wallet updated successfully", "balance" => $balance]);
    }
}
