<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;

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

// for admin
Route::middleware(['auth:sanctum', 'isAdminApi'])->group(function () {
    // check auth user
    Route::get('checkAuthinticate', function () {
        return response()->json([
            'status' => 200,
            'message' => 'You are in',
        ], 200);
    });

    Route::get('/view-category', [CategoryController::class, 'index']);
    Route::post('/store-category', [CategoryController::class, 'store']);
});

// for normal user
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
