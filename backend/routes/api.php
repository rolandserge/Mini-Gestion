<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TacheController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post("/activate", [AdminController::class, "activate"]);
/*
|--------------------------------------------------------------------------
| PROTECTED ROUTE
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api', "approuve"])->group(function () {

    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'update']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    /*
    |--------------------------------------------------------------------------
    | PROJECTS CRUD // missing nous permet d'afficher un message json dans en cas d'erreur 404
    |--------------------------------------------------------------------------
    */
    Route::apiResource('/projects', ProjectController::class)
     ->missing(function () {
        return response()->json([
            "message" => "Désolé, ce projet n'existe pas dans notre base de données.",
            "status" => 404
        ], 404);
    });;
    /*
    |--------------------------------------------------------------------------
    | TASKS CRUD
    |--------------------------------------------------------------------------
    */
    // Liste toutes les tâches (avec filtres ?status=&priority=)
    Route::get('/tasks', [TacheController::class, 'index']);
    // Afficher une tâche
    Route::get('/tasks/{task}', [TacheController::class, 'show'])
        ->missing(function () {
            return response()->json([
                "message" => "Désolé, cette tâche n'existe pas dans notre base de données.",
                "status" => 404
            ], 404);
        });
    // Créer une tâche dans un projet
    Route::post('/projects/{project}/tasks', [TacheController::class, 'store'])
        ->missing(function () {
            return response()->json([
                "message" => "Le projet spécifié n'existe pas, impossible de créer la tâche.",
                "status" => 404
            ], 404);
        });
    // Modifier une tâche
    Route::put('/tasks/{task}', [TacheController::class, 'update'])
        ->missing(function () {
            return response()->json([
                "message" => "La tâche que vous essayez de supprimer n'existe pas.",
                "status" => 404
            ], 404);
        });
    Route::patch('/tasks/{task}/status', [TacheController::class, 'updateStatus'])
        ->missing(function () {
            return response()->json([
                "message" => "La tâche que vous essayez de mettre à jour n'existe pas.",
                "status" => 404
            ], 404);
        });
    // Supprimer une tâche
    Route::delete('/tasks/{task}', [TacheController::class, 'destroy'])
        ->missing(function () {
            return response()->json([
                "message" => "La tâche que vous essayez de supprimer n'existe pas.",
                "status" => 404
            ], 404);
        });
    /*
    |--------------------------------------------------------------------------
    | ASSIGNATION MANY-TO-MANY
    |--------------------------------------------------------------------------
    */
    Route::post('tasks/{task}/assign', [TacheController::class, 'assign'])
        ->missing(function () {
            return response()->json([
                "message" => "La tâche pour désassignation n'existe pas.",
                "status" => 404
            ], 404);
        });

    Route::post('tasks/{task}/unassign', [TacheController::class, 'unassign'])
        ->missing(function () {
            return response()->json([
                "message" => "La tâche pour désassignation n'existe pas.",
                "status" => 404
            ], 404);
        });
    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */
    // Route::get('dashboard', [DashboardController::class, 'summary']);
});

// Route::middleware('auth:api')->group(function () {
//     Route::post("/activate", [AdminController::class, "activate"]);
// });

Route::middleware(['auth:api', 'approuve', 'role:admin'])->group(function () {

    Route::get('/admin/users', [AdminController::class, 'index']);
    Route::get('/admin/users/pending', [AdminController::class, 'pending']);
    Route::post('/admin/users/{user}/approve', [AdminController::class, 'approve']);
    Route::post('/admin/users/{user}/reject', [AdminController::class, 'reject']);
    Route::post('/admin/users/{user}/ban', [AdminController::class, 'ban']);
    Route::delete('/admin/users/{user}', [AdminController::class, 'destroy']);
});