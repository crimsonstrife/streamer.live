<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('stream_social_post_rules', function (Blueprint $table) {
            $table->id();

            $table->foreignId('stream_social_account_id')
                ->constrained('stream_social_accounts')
                ->cascadeOnDelete();

            // Keep as string for future expansion (live/offline/title_change/etc.)
            $table->string('event')->default('live')->index();

            // If null, applies to any streamer (or your default channel)
            $table->string('streamer_username')->nullable()->index();

            // Regex pattern, e.g. "/^(Just Chatting|Elden Ring)$/i"
            $table->string('category_pattern')->nullable();

            $table->text('message_template');

            $table->boolean('enabled')->default(true)->index();

            $table->unsignedInteger('sort_order')->default(0)->index();

            $table->timestamps();

            $table->json('options')->nullable(); // e.g. {"include_url":true,"max_length":280}

            // Helpful composite index for the common query path:
            $table->index(['enabled', 'event', 'streamer_username'], 'stream_social_post_rules_lookup');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stream_social_post_rules');
    }
};
