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
        Schema::create('emotes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();           // e.g. "pogchamp"
            $table->text('keywords')->nullable();       // JSON or comma-separated
            $table->string('image_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emotes');
    }
};
