<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
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
            'createur' => new UserResource($this->whenLoaded('user')),
            'date' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
