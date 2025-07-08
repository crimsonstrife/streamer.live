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
        Schema::create('fonts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();      // e.g. "inter", "mulish"
            $table->string('name');                // human-readable
            $table->string('file_path');           // relative to public/fonts/
            $table->integer('weight_min')->default(100);
            $table->integer('weight_max')->default(900);
            $table->boolean('is_builtin')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fonts');
    }
};
