<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeOrder(Request $req)
    {
        if (auth('sanctum')->check()) {

            $validator = Validator::make($req->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',
            ]);

            if ($validator->fails()) {

                return response()->json([
                    'error' => $validator->messages(),
                    'status' => 422
                ]);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                $order->user_id = $user_id;
                $order->firstname = $req->firstname;
                $order->lastname = $req->lastname;
                $order->phone = $req->phone;
                $order->email = $req->email;
                $order->address = $req->address;
                $order->city = $req->city;
                $order->state = $req->state;
                $order->zipcode = $req->zipcode;

                $order->payment_mode = 'COD';
                // $order->payment_id = 'COD';
                $order->tracking_no = 'reactecom' . rand(11111, 9999);
                // $order->status = $req->status;
                // $order->remark = $req->remark;
                $order->save();


                // getting cart value by auth user
                $cart = Cart::where('user_id', $user_id)->get();

                // storing all user cart items to orderitems table
                $orderItems = [];

                foreach ($cart as $item) {
                    $orderItems[] = [
                        'product_id' => $item->product_id,
                        'qty' => $item->product_qty,
                        'price' => $item->product->selling_price,
                    ];

                    // update product qty
                    $item->product->update([
                        'qty' => $item->product->qty - $item->product_qty,
                    ]);
                }

                // an order can have many items so storing the order items with relationship 
                $order->Orderitems()->createmany($orderItems);

                // after set order items clear the cart items
                Cart::destroy($cart);
                return response()->json([
                    'status' => 200,
                    'message' => 'Order place successfully'
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
