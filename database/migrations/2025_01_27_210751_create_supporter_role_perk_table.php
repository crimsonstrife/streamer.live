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
        Schema::create('supporter_role_perk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supporter_role_id')->constrained()->onDelete('cascade');
            $table->foreignId('perk_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supporter_role_perk');
    }
};
