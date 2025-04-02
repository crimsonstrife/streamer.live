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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('provider_id')->unique(); // Fourthwall order ID
            $table->string('friendly_id')->nullable();
            $table->string('checkout_id')->nullable();
            $table->string('promotion_id')->nullable();
            $table->string('status')->default('PENDING');
            $table->string('email')->index();
            $table->string('username')->nullable();
            $table->boolean('email_marketing_opt_in')->default(false);
            $table->json('billing_address')->nullable();
            $table->json('shipping_address')->nullable();
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('shipping', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('donation', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);
            $table->string('currency')->default('USD');
            $table->text('message')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
