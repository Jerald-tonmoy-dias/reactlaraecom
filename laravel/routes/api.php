<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// public route
Route::get('/get-category-collection', [FrontendController::class, 'category']);
Route::get('/get-frontend-products-data/{slug}', [FrontendController::class, 'product']);
Route::get('/view-product/{category_slug}/{product_slug}', [FrontendController::class, 'viewProduct']);

// cart api
Route::post('/add-to-cart', [CartController::class, 'addtoCart']);
Route::get('/cart-data', [CartController::class, 'viewcart']);
Route::put('/updatecart-qty/{cart_idd}/{scope}', [CartController::class, 'updateQty']);
Route::delete('/delete-cart-item/{cart_idd}', [CartController::class, 'deleteCart']);

// checkout 
Route::post('/place-order', [CheckoutController::class, 'placeOrder']);


// for admin
Route::middleware(['auth:sanctum', 'isAdminApi'])->group(function () {
    // check auth user
    Route::get('checkAuthinticate', function () {
        return response()->json([
            'status' => 200,
            'message' => 'You are in',
        ], 200);
    });

    // category route
    Route::get('/view-category', [CategoryController::class, 'index']);
    Route::post('/store-category', [CategoryController::class, 'store']);
    Route::get('/edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('/update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('/delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('/get-all-category', [CategoryController::class, 'allCategory']);

    //product route
    Route::post('/store-product', [ProductController::class, 'store']);
    Route::get('/view-product', [ProductController::class, 'index']);
    Route::get('/edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('/update-product/{id}', [ProductController::class, 'update']);
});

// for normal user
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
