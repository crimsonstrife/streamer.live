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
        Schema::create('twitch_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('metric');      // e.g. "followers", "subscribers", "total_views"
            $table->unsignedBigInteger('value');
            $table->timestamp('recorded_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('twitch_metrics');
    }
};
