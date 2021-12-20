<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
            'password'=> Hash::make($req->password),
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

    public function login(Request $req) {
     
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        
        if($validator->fails()) {
         
         return response()->json([
            
                'validation_erros'=>$validator->messages(),
            ]);
           
        } else {
          
            $user = User::where('email', $req->email)->first();

            if (! $user || ! Hash::check($req->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid Credentials',
                ]);
            } else {
                $token =  $user->createToken($user->name.'_token-name')->plainTextToken;
                return response()->json([
                'status' => 200,
                'message' => 'Logged in successfully',
                'token' => $token,
                'auth_name'=> $user->name
       ]);
            }
        }
    }
}
