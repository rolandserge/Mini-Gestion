<?php

namespace App\Models;

use App\Models\User;
use App\Models\Projet;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tache extends Model
{
    
    protected $fillable = ["titre", "description", "statut", "priorite", "projet_id"];

    public function assignees() : BelongsToMany {

        return $this->belongsToMany(User::class);
    }

    public function projet() : BelongsTo {

        return $this->belongsTo(Projet::class, "projet_id");
    }
}
