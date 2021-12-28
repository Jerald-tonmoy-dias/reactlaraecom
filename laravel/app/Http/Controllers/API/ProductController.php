<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'category_id' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' => 'required|max:191',
            'brand' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20',
            'qty' => 'required|max:20',
            'image' => 'required|image|mimes: jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $product = new Product;
            $product->category_id = $req->input('category_id');
            $product->meta_title = $req->input('meta_title');
            $product->meta_keyword = $req->input('meta_keyword');
            $product->meta_des = $req->input('meta_des');
            $product->slug = $req->input('slug');
            $product->name = $req->input('name');
            $product->des = $req->input('des');
            $product->brand = $req->input('brand');
            $product->selling_price = $req->input('selling_price');
            $product->original_price = $req->input('original_price');
            $product->qty = $req->input('qty');

            if ($req->hasFile('image')) {
                $file = $req->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/' . $filename;
            }

            $product->featured = $req->input('featured') == true ? '1' : '0';
            $product->popular = $req->input('popular') == true ? '1' : '0';
            $product->status = $req->input('status') == true ? '1' : '0';
            $product->save();
            return response()->json([
                'status' => 200,
                'message' => 'Product added Succefully'
            ]);
        }
    }
}
