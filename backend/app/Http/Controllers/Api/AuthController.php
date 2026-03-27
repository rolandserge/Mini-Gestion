<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request) {
        
        // Générer un code d'activation
        $code = strtoupper(Str::random(6));

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status_compte' => 'attente',
            'activation_code' => $code,
            'activation_expires_at' => now()->addHours(24)
        ]);

         return response()->json([
            'message' => 'Compte crée. En attente de validation',
        ], 200);
    }

    public function login(Request $request) {

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 422);
        }

        $user = auth('api')->user();

        // 🔥 Bloquer si non validé
        if ($user->status_compte !== 'approuve') {
            return response()->json([
                'error' => 'ACCOUNT_PENDING',
                'message' => 'Votre compte doit être validé par un administrateur'
            ], 403);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => $user
        ]);
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
                'message' => 'Impossible de rafraîchir le token'
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
            'message' => 'Déconnexion réussie'
        ]);
    }

    /**
     * Modifier son profil
     */
    public function update(Request $request)
    {
        $user = auth('api')->user();

        $data = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
        ]);

        $user->update($data);

        return response()->json([
            'message' => 'Profil mis à jour',
            'user' => $user
        ]);
    }

    /**
     * Changer mot de passe
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6'
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Mot de passe actuel incorrect'
            ], 400);
        }

        $user->update([
            'password' => bcrypt($request->new_password)
        ]);

        return response()->json([
            'message' => 'Mot de passe changé avec succès'
        ]);
    }
}