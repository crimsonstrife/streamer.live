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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('provider_id')->unique(); // Fourthwall product ID
            $table->string('provider')->default('fourthwall');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('state')->nullable(); // Product state (e.g., active, inactive)
            $table->string('access')->nullable(); // Access type (e.g., public, private)
            $table->decimal('price', 10, 2);
            $table->decimal('compare_at_price', 10, 2)->nullable(); // Original price before discounts
            $table->string('external_url')->nullable(); // Checkout link
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
