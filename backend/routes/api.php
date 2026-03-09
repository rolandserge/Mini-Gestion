<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TacheController;
use App\Http\Controllers\Api\ProjectController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    // Route::post('refresh', [AuthController::class, 'refresh']);
});


/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | PROJECTS CRUD
    |--------------------------------------------------------------------------
    */

    Route::apiResource('/projects', ProjectController::class);


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
    Route::patch('/tasks/{task}', [TacheController::class, 'update']);
    // Supprimer une tâche
    Route::delete('/tasks/{task}', [TacheController::class, 'destroy']);

    // Assigner des utilisateurs
    Route::post('/tasks/{task}/assign', [TacheController::class, 'assign']);

    // Désassigner des utilisateurs
    Route::post('/tasks/{task}/unassign', [TacheController::class, 'unassign']);

    // Liste + création des tâches d’un projet
    Route::get('projects/{project}/tasks', [TacheController::class, 'index']);
    Route::post('projects/{project}/tasks', [TacheController::class, 'store']);
    // CRUD tâche individuelle
    // Route::get('tasks/{task}', [TacheController::class, 'show']);
    // Route::put('tasks/{task}', [TacheController::class, 'update']);
    // Route::delete('tasks/{task}', [TacheController::class, 'destroy']);

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