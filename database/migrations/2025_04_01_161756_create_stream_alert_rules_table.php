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
        Schema::create('stream_alert_rules', function (Blueprint $table) {
            $table->id();
            $table->string('category_pattern');
            $table->text('message_template');
            $table->string('discord_channel_id');
            $table->json('discord_roles')->nullable();
            $table->boolean('enabled')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stream_alert_rules');
    }
};
