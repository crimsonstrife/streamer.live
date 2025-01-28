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
        Schema::create('user_supporter_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('supporter_role_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Add a unique constraint to prevent duplicate entries
        Schema::table('user_supporter_roles', function (Blueprint $table) {
            $table->unique(['user_id', 'supporter_role_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the unique constraint first to prevent errors
        Schema::table('user_supporter_roles', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'supporter_role_id']);
        });
        Schema::dropIfExists('user_supporter_roles');
    }
};
