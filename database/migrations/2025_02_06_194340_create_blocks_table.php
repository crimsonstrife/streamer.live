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
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Allow reusable blocks to have a name
            $table->string('type'); // Text, Image, Embed, etc.
            $table->json('content'); // Stores block data
            $table->timestamps();
        });

        Schema::create('page_block', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->foreignId('block_id')->constrained()->cascadeOnDelete();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_block');
        Schema::dropIfExists('blocks');
    }
};
