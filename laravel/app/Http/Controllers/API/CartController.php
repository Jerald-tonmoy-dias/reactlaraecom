<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    public function addtoCart(Request $req)
    {
        // $cart = new Cart;

        if (auth('sanctum')->check()) {
            return response()->json([
                'status' => 201,
                'message' => 'darun'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login fast'
            ]);
        }
    }
}
