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
    //    $projects = Projet::where('user_id', auth()->id())->with(['user', 'tasks'])->latest()->get();
       $projects = Projet::with(['user', 'tasks'])->latest()->get();

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

            if($project) {
    
                return new ProjectResource($project->load('user'));
                
            } else {
                return response()->json([
                    'message' => 'Erreur serveur',
                ], 207);
            }
        } catch(Exception $e) {
            
            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
                "ereur_tous" => $e
            ], 500);
        }
    }

    /**
     * GET /api/projects/{project}
     */
    public function show(Projet $project)
    {

        try {
            //code...
                $this->authorizeProject($project);
        
                return new ProjectResource($project);
                // return response()->json([
                //     "message" => "Le projet est introuvable dans la base de donnée"
                // ], 403);

        } catch (Exception $e) {
            //throw $th;
            return response()->json([
                "message" => $e->getMessage(),
                "errors" => $e
            ], 300);
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
            ], 201);

        } catch(Exception $e) {

            return response()->json([
                "message" => $e->getMessage(),
                "errors" => $e
            ], 300);
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
            ], 201);
        } catch(Exception $e) {

            return response()->json([
                "message" => $e->getMessage(),
                "errors" => $e
            ], 300);
        };
    }

    private function authorizeProject(Projet $project)
    {
        if ($project->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
    }
}
