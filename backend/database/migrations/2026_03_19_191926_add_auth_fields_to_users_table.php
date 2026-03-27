<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'manager', 'user'])
                ->default('user')
                ->after('email');
            $table->enum('status_compte', ['attente', 'approuve', 'rejete', 'bannis'])
                ->default('attente')
                ->after('role');
            $table->string('activation_code')->nullable()->after('status_compte');
            // ⏳ Expiration du code
            $table->timestamp('activation_expires_at')->nullable()->after('activation_code');
            // 🚫 Tentatives d’activation
            $table->integer('activation_attempts')->default(0)->after('activation_expires_at');
            // 🔒 Blocage temporaire
            $table->timestamp('activation_blocked_until')->nullable()->after('activation_attempts');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'status_compte',
                'activation_code',
                'activation_expires_at',
                'activation_attempts',
                'activation_blocked_until'
            ]);
        });
    }
};