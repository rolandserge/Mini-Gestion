<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Liste tous les utilisateurs
     */
    public function index()
    {
        $users = User::latest()->get();

        return response()->json($users);
    }
    /**
     * Voir les utilisateurs en attente
     */
    public function pending()
    {
        $users = User::where('status_compte', 'attente')->get();

        return response()->json($users);
    }
    /**
     * Approuver un utilisateur
     */
    public function approve(User $user)
    {
        if ($user->status_compte === 'approuve') {

            return response()->json([
                'message' => 'Utilisateur déjà approuvé'
            ], 400);
        }

        $user->update([
            'status_compte' => 'approuve',
            'activation_code' => null,
            'activation_expires_at' => null,
            'activation_attempts' => 0,
            'activation_blocked_until' => null
        ]);

        return response()->json([
            'message' => 'Utilisateur approuvé avec succès'
        ]);
    }
    public function activate(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'error' => 'USER_NOT_FOUND',
                'message' => 'Utilisateur introuvable'
            ], 404);
        }
        // 🔥 1. Vérifier si déjà activé
        if ($user->status_compte === 'approuve') {
            return response()->json([
                'error' => 'ALREADY_ACTIVATED',
                'message' => 'Ce compte est déjà activé'
            ], 400);
        }
        // 🔥 2. Vérifier si bloqué temporairement
        if ($user->activation_blocked_until && now()->lt($user->activation_blocked_until)) {
            return response()->json([
                'error' => 'TOO_MANY_ATTEMPTS',
                'message' => 'Trop de tentatives. Réessayez plus tard'
            ], 429);
        }
        // 🔥 3. Vérifier expiration
        if ($user->activation_expires_at < now()) {
            return response()->json([
                'error' => 'CODE_EXPIRED',
                'message' => 'Code expiré'
            ], 400);
        }
        // 🔥 4. Vérifier code
        if ($request->code !== $user->activation_code) {
            // Incrémenter tentatives
            $user->increment('activation_attempts');
            // Bloquer après 5 tentatives
            if ($user->activation_attempts >= 5) {
                $user->update([
                    'activation_blocked_until' => now()->addMinutes(30),
                    'activation_attempts' => 0 // reset après blocage
                ]);
            }

            return response()->json([
                'error' => 'INVALID_CODE',
                'message' => 'Code invalide'
            ], 400);
        }

        // ✅ SUCCESS → reset tout
        $user->update([
            'status_compte' => 'approuve',
            'activation_code' => null,
            'activation_expires_at' => null,
            'activation_attempts' => 0,
            'activation_blocked_until' => null
        ]);

        return response()->json([
            'message' => 'Compte activé avec succès'
        ]);
    }
    /**
     * Rejeter un utilisateur
     */
    public function reject(User $user)
    {
        $user->update([
            'status_compte' => 'rejete'
        ]);

        return response()->json([
            'message' => 'Utilisateur rejeté'
        ]);
    }
    /**
     * Bannir un utilisateur
     */
    public function ban(User $user)
    {
        $user->update([
            'status_compte' => 'bannis'
        ]);

        return response()->json([
            'message' => 'Utilisateur banni'
        ]);
    }
    /**
     * Supprimer un utilisateur
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'Utilisateur supprimé'
        ]);
    }

    // public function resendCode(User $user)
    // {
    //     // 🔥 1. Vérifier si déjà approuvé
    //     if ($user->status_compte === 'approuve') {
    //         return response()->json([
    //             'message' => 'Ce compte est déjà activé'
    //         ], 400);
    //     }

    //     // 🔥 2. Anti spam (1 min)
    //     if ($user->last_code_sent_at && now()->diffInSeconds($user->last_code_sent_at) < 60) {
    //         return response()->json([
    //             'message' => 'Veuillez attendre avant de demander un nouveau code'
    //         ], 429);
    //     }

    //     // 🔥 3. Générer nouveau code
    //     $code = strtoupper(Str::random(6));

    //     // 🔥 4. Mettre à jour user
    //     $user->update([
    //         'activation_code' => $code,
    //         'activation_expires_at' => now()->addMinutes(30),
    //         'activation_attempts' => 0,
    //         'activation_blocked_until' => null,
    //         'last_code_sent_at' => now()
    //     ]);
      // }
}