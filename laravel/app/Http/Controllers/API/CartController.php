<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    public function addtoCart(Request $req)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $req->product_id;
            $product_qty = $req->product_qty;
            $productCheck = Product::where('id', $product_id)->first();


            if ($productCheck) {
                $checkCart = Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists();
                if ($checkCart) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name . 'Product Already added Successfully'
                    ]);
                } else {
                    $cart = new Cart;
                    $cart->user_id = $user_id;
                    $cart->product_id = $product_id;
                    $cart->product_qty = $product_qty;
                    $cart->save();

                    return response()->json([
                        'status' => 201,
                        'message' => 'Add to cart successfully'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Prodcut not found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login first'
            ]);
        }
    }

    public function viewcart()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cart
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login first'
            ]);
        }
    }

    public function updateQty($cart_idd, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('id', $cart_idd)->where('user_id', $user_id)->first();

            if ($scope === 'inc') {
                $cart->product_qty += 1;
            } else if ($scope === 'dec') {
                $cart->product_qty -= 1;
            }
            $cart->update();
            return response()->json([
                'status' => 200,
                'message' => 'quantity updated'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login first'
            ]);
        }
    }

    public function deleteCart($cart_idd)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('id', $cart_idd)->where('user_id', $user_id)->first();

            if ($cart) {
                $cart->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'cart item removed successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart item not found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please login first'
            ]);
        }
    }
}
