<?php

namespace App\Http\Resources;

use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
            'id' => $this->id,
            'nom' => $this->nom,
            'description' => $this->description,
            'couleur' => $this->couleur,
            'date' => $this->created_at->format('Y-m-d H:i:s'),
            'progress' => $this->progress
            'createur' => new UserResource($this->whenLoaded('user')),
            'taches' => TaskResource::collection($this->whenLoaded("tasks")),
        ];
    }
}