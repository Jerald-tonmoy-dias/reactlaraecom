<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index()
    {
        $category = Product::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    // add product
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

    // edit function
    public function edit($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Product id not found'
            ]);
        }
    }

    // update function
    public function update(Request $req, $id)
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
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $product = Product::find($id);
            if ($product) {
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
                    $path = $product->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $req->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/product/', $filename);
                    $product->image = 'uploads/product/' . $filename;
                }

                $product->featured = $req->input('featured');
                $product->popular = $req->input('popular');
                $product->status = $req->input('status');
                $product->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Product updated Succefully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found'
                ]);
            }
        }
    }
}
