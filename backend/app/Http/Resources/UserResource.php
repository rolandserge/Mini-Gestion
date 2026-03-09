<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'nom' => $this->name,
            'email' => $this->email,
            // Relations (chargées seulement si with())
            'projects' => [] || ProjectResource::collection($this->whenLoaded('projets')),
            'creationHeure' => $this->created_at?->toISOString(),
            'modificationHeure' => $this->updated_at?->toISOString(),
        ];
    }
}
