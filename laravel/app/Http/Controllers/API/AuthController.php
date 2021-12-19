<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $req) {
     
        $validator = Validator::make($req->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:6',
        ]);

        

        if($validator->fails()) {
         
         return response()->json([
            
                'validation_erros'=>$validator->messages(),
            ]);
           
        } else {
          
            $user = User::create([
            'name'=>$req->name,
            'email'=>$req->email,
            'password'=>$req->password,
        ]);

        $token =  $user->createToken($user->name.'_token-name')->plainTextToken;

        return response()->json([
           'status' => 200,
           'message' => 'Registered successfully',
           'token' => $token,
           'auth_name'=> $user->name
       ]);
        }

    }
}
