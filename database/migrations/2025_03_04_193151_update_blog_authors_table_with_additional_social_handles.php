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
        // Table already has twitter_handle and github_handle columns
        Schema::table('blog_authors', function (Blueprint $table) {
            $table->string('facebook_handle')->nullable()->after('twitter_handle');
            $table->string('linkedin_handle')->nullable()->after('facebook_handle');
            $table->string('instagram_handle')->nullable()->after('linkedin_handle');
            $table->string('youtube_handle')->nullable()->after('instagram_handle');
            $table->string('tiktok_handle')->nullable()->after('youtube_handle');
            $table->string('twitch_handle')->nullable()->after('tiktok_handle');
            $table->string('discord_handle')->nullable()->after('twitch_handle');
            $table->string('kick_handle')->nullable()->after('discord_handle');
            $table->string('snapchat_handle')->nullable()->after('kick_handle');
            $table->string('whatsapp_handle')->nullable()->after('snapchat_handle');
            $table->string('telegram_handle')->nullable()->after('whatsapp_handle');
            $table->string('signal_handle')->nullable()->after('telegram_handle');
            $table->string('slack_handle')->nullable()->after('signal_handle');
            $table->string('reddit_handle')->nullable()->after('slack_handle');
            $table->string('pinterest_handle')->nullable()->after('reddit_handle');
            $table->string('tumblr_handle')->nullable()->after('pinterest_handle');
            $table->string('medium_handle')->nullable()->after('tumblr_handle');
            $table->string('bluesky_handle')->nullable()->after('medium_handle');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
