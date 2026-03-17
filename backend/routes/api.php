<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TacheController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {

    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    /*
    |--------------------------------------------------------------------------
    | PROJECTS CRUD // missing nous permet d'afficher un message json dans en cas d'erreur 404
    |--------------------------------------------------------------------------
    */
    Route::apiResource('/projects', ProjectController::class)
     ->missing(function (Request $request) {
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
    Route::get('/tasks/{task}', [TacheController::class, 'show']);
    // Créer une tâche dans un projet
    Route::post('/projects/{project}/tasks', [TacheController::class, 'store']);
    // Modifier une tâche
    Route::put('/tasks/{task}', [TacheController::class, 'update']);
    Route::patch('/tasks/{task}/status', [TacheController::class, 'updateStatus']);
    // Supprimer une tâche
    Route::delete('/tasks/{task}', [TacheController::class, 'destroy']);
    // Assigner des utilisateurs
    Route::post('/tasks/{task}/assign', [TacheController::class, 'assign']);
    // Désassigner des utilisateurs
    Route::post('/tasks/{task}/unassign', [TacheController::class, 'unassign']);
    /*
    |--------------------------------------------------------------------------
    | ASSIGNATION MANY-TO-MANY
    |--------------------------------------------------------------------------
    */
    Route::post('tasks/{task}/assign', [TacheController::class, 'assign']);
    Route::post('tasks/{task}/unassign', [TacheController::class, 'unassign']);
    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    // Route::get('dashboard', [DashboardController::class, 'summary']);
});
