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
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            $table->foreign('updated_by')->references('id')->on('users')->nullOnDelete();
        });

        Schema::create('post_tag', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('tag_id');
            $table->timestamps();
        });

        Schema::table('post_tag', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->cascadeOnDelete();
            $table->foreign('tag_id')->references('id')->on('tags')->cascadeOnDelete();
        });

        Schema::create('pages_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('page_id');
            $table->unsignedBigInteger('tag_id');
            $table->timestamps();
        });

        Schema::table('pages_tags', function (Blueprint $table) {
            $table->foreign('page_id')->references('id')->on('pages')->cascadeOnDelete();
            $table->foreign('tag_id')->references('id')->on('tags')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('post_tag', function (Blueprint $table) {
            $table->dropForeign(['post_id']);
            $table->dropForeign(['tag_id']);
        });
        Schema::dropIfExists('post_tag');
        Schema::table('page_tag', function (Blueprint $table) {
            $table->dropForeign(['page_id']);
            $table->dropForeign(['tag_id']);
        });
        Schema::dropIfExists('page_tag');
        Schema::dropIfExists('tags');
    }
};
