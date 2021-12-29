<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use  App\Models\Category;

class FrontendController extends Controller
{
    public function category()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
}
