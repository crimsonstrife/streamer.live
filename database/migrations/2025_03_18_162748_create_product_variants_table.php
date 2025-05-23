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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->string('provider_id')->unique(); // Fourthwall variant ID
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('sku')->nullable(); // SKU (Stock Keeping Unit)
            $table->decimal('price', 10, 2)->default(0.00); // Current price
            $table->decimal('compare_at_price', 10, 2)->nullable();
            $table->string('stock_status')->nullable(); // e.g., "limited", "unlimited"
            $table->integer('stock_count')->default(0);
            $table->integer('weight')->nullable();
            $table->string('weight_unit')->nullable(); // kg, lb, etc.
            $table->integer('length')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->string('dimension_unit')->nullable(); // cm, inch, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the foreign key constraint
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
        });
        // Drop the table
        Schema::dropIfExists('product_variants');
    }
};
