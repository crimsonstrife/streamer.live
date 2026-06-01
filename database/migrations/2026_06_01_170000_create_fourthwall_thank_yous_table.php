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
        Schema::create('fourthwall_thank_yous', function (Blueprint $table) {
            $table->id();
            $table->string('provider_id')->unique();
            $table->string('provider')->default('fourthwall');
            $table->text('media_url')->nullable();
            $table->string('contribution_id')->nullable()->index();
            $table->string('contribution_type')->nullable()->index();
            $table->string('shop_id')->nullable()->index();
            $table->string('supporter_email')->nullable();
            $table->string('supporter_username')->nullable();
            $table->text('supporter_message')->nullable();
            $table->json('raw_payload')->nullable();
            $table->timestamp('synced_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fourthwall_thank_yous');
    }
};
