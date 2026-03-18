<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Projet;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    // $projects = Projet::where('user_id', auth()->id())->with(['user', 'tasks'])->latest()->get();
       $projects = Projet::with(['user', 'tasks'])->latest()->get();

         // Ajouter la progression à chaque projet
        $projects->each(function ($project) {
            $project->progress = $this->calculateProgress($project);
        });
        
        return ProjectResource::collection($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            $project = Projet::create([
                'nom' => $request->nom,
                'description' => $request->description,
                'couleur' => $request->couleur,
                'user_id' => Auth::id(),
            ]);

            return new ProjectResource($project->load('user'));

        } catch(Exception $e) {

            return $this->responseWithErrorApi($e);
        }
    }
    /**
     * GET /api/projects/{project}
     */
    public function show(Projet $project)
    {

        try {
            $project->progress = $this->calculateProgress($project);

            $this->authorizeProject($project);
        
            return new ProjectResource($project);

        } catch (Exception $e) {

            return $this->responseWithErrorApi($e);
        }
    }
    /**
     * PUT /api/projects/{project}
     */
    public function update(UpdateProjectRequest $request, Projet $project)
    {
        try {

            $this->authorizeProject($project);
    
            $project->update($request->validated());
    
            return response()->json([
                "message" => "le projet a été modifié avec succès",
                "projet" => new ProjectResource($project),
            ], 200);

        } catch(Exception $e) {

            return $this->responseWithErrorApi($e);
        };
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Projet $project)
    {
        try {
            $this->authorizeProject($project);
    
            $project->delete();
    
            return response()->json([
                'message' => 'Projet supprimé avec succès',
            ], 200);
        } catch(Exception $e) {

            return $this->responseWithErrorApi($e);
        };
    }
     /**
     * Calculer la progression du projet
     */
    private function calculateProgress(Projet $project)
    {
        $tasks = $project->tasks()
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN statut = 'Termine' THEN 1 ELSE 0 END) as completed
            ")
            ->first();

        return $tasks->total > 0
            ? round(($tasks->completed / $tasks->total) * 100, 2)
            : 0;
    }

    private function authorizeProject(Projet $project)
    {
        if ($project->user_id !== auth()->id()) {
            abort(403, 'Vous n\'êtes pas autorisz a effectuer cette opération');
        }
    }

    private function responseWithErrorApi($e) {

        return response()->json([
            'message' => $e->getMessage(),
            'erreur' => "Erreur survenue",
        ], 500);
    }
}