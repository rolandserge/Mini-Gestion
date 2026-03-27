<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('api')->user();

        if ($user->status_compte !== 'approuve') {
            return response()->json([
                'message' => 'Votre compte n\'est pas encore activé'
            ], 403);
        }

        if ($user->status_compte === 'bannis') {
            return response()->json([
                'message' => 'Votre compte est banni'
            ], 403);
        }
        return $next($request);
    }
}