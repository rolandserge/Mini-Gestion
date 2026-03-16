<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request) {
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

         $token = JWTAuth::fromUser($user);

         return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ], 201);
    }

    public function login(Request $request) {

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function refresh()
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();

            return response()->json([
                'status' => 'success',
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60,
                'user' => auth('api')->user()
            ]);
        } catch (Exception $e) {
            // Si le token est trop vieux (Refresh TTL dépassé) ou invalide
            return response()->json([
                'error' => 'Impossible de rafraîchir le token'
                ], 401);
        }
    }

    public function me() {

        return response()->json([
            'user' => auth('api')->user()
        ]);
    }

    public function logout() {

        auth('api')->logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

 
    protected function respondWithToken($token) {

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }

}