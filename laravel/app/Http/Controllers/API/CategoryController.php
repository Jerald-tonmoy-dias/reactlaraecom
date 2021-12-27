<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use  App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }
    // store function
    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'meta_title' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' => 'required|max:191',
        ]);
        if ($validator->fails()) {

            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $category = new Category;
            $category->meta_title = $req->input('meta_title');
            $category->meta_keyword = $req->input('meta_keyword');
            $category->meta_des = $req->input('meta_des');
            $category->slug = $req->input('slug');
            $category->name = $req->input('name');
            $category->des = $req->input('des');
            $category->status = $req->input('status') == true ? '1' : '0';
            $category->save();

            return response()->json([
                'status' => 200,
                'message' => 'Category added Succefully'
            ]);
        }
    }

    // edit function
    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Category id not found'
            ]);
        }
    }

    // update function
    public function update(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'meta_title' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' => 'required|max:191',
        ]);
        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $category = Category::find($id);
            if ($category) {
                $category->meta_title = $req->input('meta_title');
                $category->meta_keyword = $req->input('meta_keyword');
                $category->meta_des = $req->input('meta_des');
                $category->slug = $req->input('slug');
                $category->name = $req->input('name');
                $category->des = $req->input('des');
                $category->status = $req->input('status') == true ? '1' : '0';
                $category->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Category updated Succefully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Category Id Not found'
                ]);
            }
        }
    }

    // delete funtion
    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No category id found',
            ]);
        }
    }
}
