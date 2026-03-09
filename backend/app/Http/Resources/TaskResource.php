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
            'createur' => UserResource::collection($this->whenLoaded('users')),
            'creationHeure' => $this->created_at?->toISOString(),
            'moficationHeure' => $this->updated_at?->toISOString(),
        ];
    }
}
