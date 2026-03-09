<?php

namespace App\Models;

use App\Models\User;
use App\Models\Tache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Projet extends Model
{
    protected $fillable = ["nom", "description", "couleur", "user_id"];

    public function user() : BelongsTo {

        return $this->belongsTo(User::class, "user_id");
    }

    public function tasks() : HasMany {

        return $this->hasMany(Tache::class);
    }
}
