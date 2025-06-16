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
        Schema::table('posts', function (Blueprint $table) {
            $table->boolean('comments_locked')->default(false);
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->boolean('replies_locked')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('comments_locked');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn('replies_locked');
        });
    }
};
