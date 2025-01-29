<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('perks', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Perk name
            $table->text('description')->nullable(); // Description of the perk
            $table->string('source')->nullable(); // Source (e.g., Twitch, Patreon)
            $table->boolean('is_enabled')->default(true); // Whether the perk is enabled
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perks');
    }
};
