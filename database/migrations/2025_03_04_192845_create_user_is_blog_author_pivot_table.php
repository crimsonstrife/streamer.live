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
        Schema::create('user_is_blog_author_pivot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('blog_author_id')->constrained('blog_authors')->cascadeOnDelete();
            $table->unique(['user_id', 'blog_author_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the unique constraint first to avoid errors
        Schema::table('user_is_blog_author_pivot', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'blog_author_id']);
            // Drop the constraints
            $table->dropForeign(['user_id']);
            $table->dropForeign(['blog_author_id']);
        });
        Schema::dropIfExists('user_is_blog_author_pivot');
    }
};
