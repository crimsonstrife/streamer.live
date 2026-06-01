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
        Schema::create('fourthwall_giveaway_packages', function (Blueprint $table) {
            $table->id();
            $table->string('provider_id')->unique();
            $table->string('provider')->default('fourthwall');
            $table->string('product_provider_id')->nullable()->index();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->unsignedInteger('link_count')->default(0);
            $table->json('raw_payload')->nullable();
            $table->timestamp('synced_at')->nullable();
            $table->timestamps();
        });

        Schema::create('fourthwall_giveaway_links', function (Blueprint $table) {
            $table->id();
            $table->string('provider_id')->unique();
            $table->string('provider')->default('fourthwall');
            $table->foreignId('package_id')->nullable()->constrained('fourthwall_giveaway_packages')->cascadeOnDelete();
            $table->string('product_provider_id')->nullable()->index();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->text('link');
            $table->string('status')->nullable()->index();
            $table->timestamp('redeemed_at')->nullable();
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
        Schema::dropIfExists('fourthwall_giveaway_links');
        Schema::dropIfExists('fourthwall_giveaway_packages');
    }
};
