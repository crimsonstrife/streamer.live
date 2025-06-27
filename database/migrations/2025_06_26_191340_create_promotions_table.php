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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('provider_id')->unique(); // Fourthwall promotion ID
            $table->string('provider')->default('fourthwall');
            $table->string('title');
            $table->string('code')->nullable();        // coupon code
            $table->enum('discount_type', ['PERCENTAGE','FIXED','FREE_SHIPPING']);
            $table->unsignedInteger('percentage')->nullable();      // when discount_type = PERCENTAGE
            $table->unsignedInteger('amount_value')->nullable();    // for FIXED
            $table->string('amount_currency', 3)->nullable();
            $table->enum('shipping_option', ['Included','Excluded'])->default('Excluded');
            // appliesTo
            $table->enum('applies_to', ['ENTIRE_ORDER','SELECTED_PRODUCTS']);
            $table->boolean('once_per_order')->default(false);
            // requirements & limits
            $table->unsignedInteger('min_order_value')->nullable();
            $table->string('min_order_currency', 3)->nullable();
            $table->unsignedInteger('max_uses')->nullable();
            $table->boolean('one_use_per_customer')->default(false);
            $table->enum('status', ['Live','Draft','Archived'])->default('Draft');
            $table->string('type')->nullable(); // e.g. “SHOP_SINGLE” vs “SHOP_AUTO_APPLYING”
            $table->timestamps();
        });

        Schema::create('promotion_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promotion_id')->constrained('promotions', 'id')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products', 'id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
