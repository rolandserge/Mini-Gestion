<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            'titre' => $this->titre,
            'description' => $this->description,
            'status' => $this->statut,
            'priorite' => $this->priorite,
            'utilisateurs_assignes' => UserResource::collection($this->whenLoaded('assignees')),
            "projet" => new ProjectResource($this->whenLoaded('projet')),
            'creationHeure' => $this->created_at?->toISOString(),
            'moficationHeure' => $this->updated_at?->toISOString(),
        ];
    }
}
