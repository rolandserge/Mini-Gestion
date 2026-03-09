<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('taches', function (Blueprint $table) {
            $table->id();
            $table->string("titre");
            $table->longText("description");
            $table->enum('statut', ['A faire', 'En cours', 'Termine'])->default('A faire');
            $table->enum('priorite', ['Basse', 'Moyenne', 'Haute'])->default('Basse');
             $table->foreignId('projet_id')->constrained("projets")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taches');
    }
};
