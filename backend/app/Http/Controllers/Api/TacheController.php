<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Tache;
use App\Models\Projet;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\AssignUsersRequest;

class TacheController extends Controller
{
    /**
     * List all tasks (accessible à tous les users authentifiés)
     * GET /tasks
     */
    public function index(Request $request)
    {
        $query = Tache::with(['projet', 'assignees']);

        // Filtres globaux
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        $tasks = $query->latest()->get();


        return TaskResource::collection($tasks);
    }
    /**
     * Show single task (visible par tous)
     */
    public function show(Tache $task)
    {
        if($task) {
            // avoir le projet a lequel la tache est appartient ainsi que les utilisateurs

            $task->load(['projet', 'assignees']);
            
            return new TaskResource($task);

        } else {
            return response()->json([
                "message" => "La tache est introuvable veillez charger une bonne tache"
            ]);
        }

    }
    /**
     * Store new task (owner uniquement)
     */
    public function store(StoreTaskRequest $request, Projet $project)
    {
        try {

            $this->authorizeProjectOwner($project);

            $task = $project->tasks()->create($request->validated());

            return new TaskResource($task);

        } catch(Exception $e) {

            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
                "ereur_tous" => $e
            ], 500);
        }
    }
    /**
     * Update task (owner uniquement)
     */
    public function update(UpdateTaskRequest $request, Tache $task)
    {
        try {
            $taskLoader = $task->load("projet");

            $this->authorizeProjectOwner($taskLoader->projet);
    
            $task->update($request->validated());
    
            return new TaskResource($task);

        } catch(Exception $e) {

            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
                "ereur_tous" => $e
            ], 500);
        }
    }
    public function updateStatus(Request $request, Tache $task)
    {
        try {
            // vérifier que l'utilisateur est propriétaire du projet
            $this->authorizeProjectOwner($task->project);
            // validation
            $request->validate([
                'statut' => 'required|in:A faire,En cours,Termine'
            ]);
            // mise à jour du statut
            $task->update([
                'statut' => $request->statut
            ]);
    
            return new TaskResource($task);

        } catch(Exception $e) {

            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
                "ereur_tous" => $e
            ], 500);
        } 
    }
    /**
     * Delete task (owner uniquement)
     */
    public function destroy(Tache $task)
    {
        try {
            $taskLoader = $task->load("projet");

            // return response()->json($taskLoader->projet);

            $this->authorizeProjectOwner($taskLoader->projet);
    
            $task->delete();
    
            return response()->json([
                'message' => 'La tache été supprimée avec succès'
            ]);
        } catch(Exception $e) {

            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
                "ereur_tous" => $e
            ], 500);
        }
    }
    /**
     * Assign users (owner uniquement)
     */
    public function assign(AssignUsersRequest $request, Tache $task)
    {
        try {
            //code...
            $taskLoader = $task->load("projet");

            $this->authorizeProjectOwner($taskLoader->projet);
    
            $task->assignees()->sync($request->user_ids);
    
            return response()->json([
                'message' => 'Users assigned successfully'
            ]);
        } catch (Exception $e) {
            //throw $th;
            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
                "ereur_tous" => $e
            ], 500);
        }
    }
    /**
     * Unassign users (owner uniquement)
     */
    public function unassign(AssignUsersRequest $request, Tache $task)
    {
        try {
            //code...
            $taskLoader = $task->load("projet");

            $this->authorizeProjectOwner($taskLoader->projet);
    
            $task->assignees()->detach($request->user_ids);
    
            return response()->json([
                'message' => 'Users unassigned successfully'
            ]);

        } catch (Exception $e) {
            //throw $th;
            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
                "ereur_tous" => $e
            ], 500);
        }
    }

    private function authorizeProjectOwner(Projet $project) {

        if (auth()->id() !== $project->user_id) {
            
            return response()->json([
                'message' => 'Desolé, vous n\'avez pas l\'autorisation pour effectuer cette requête',
                'status' => 403,
            ], 403);
        }
    }
}
