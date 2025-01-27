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
        Schema::create('supporter_roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Role name (e.g., "Twitch Sub Tier 1")
            $table->string('source')->nullable(); // Source (e.g., Twitch, Patreon)
            $table->string('description')->nullable(); // Description of the role
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supporter_roles');
    }
};
