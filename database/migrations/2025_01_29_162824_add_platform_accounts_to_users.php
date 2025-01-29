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
        Schema::table('users', function (Blueprint $table) {
            $table->string('twitch_id')->nullable()->unique();
            $table->string('youtube_id')->nullable()->unique();
            $table->string('patreon_id')->nullable()->unique();
            $table->string('kofi_id')->nullable()->unique();
            $table->string('fourthwall_id')->nullable()->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['twitch_id', 'youtube_id', 'patreon_id', 'kofi_id', 'fourthwall_id']);
        });
    }
};
