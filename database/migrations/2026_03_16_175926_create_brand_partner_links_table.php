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
        Schema::create('brand_partner_links', function (Blueprint $table) {
            $table->id();

            $table->foreignId('brand_partner_id')
                ->constrained('brand_partners')
                ->cascadeOnDelete();

            $table->string('label');
            $table->string('url', 2048);

            $table->string('link_type', 30)->default('primary')->index(); // primary | affiliate | coupon | social | landing
            $table->string('coupon_code')->nullable();
            $table->string('button_text')->nullable();

            $table->boolean('is_primary')->default(false)->index();
            $table->boolean('is_active')->default(true)->index();

            $table->boolean('open_in_new_tab')->default(true);
            $table->boolean('nofollow')->default(true);
            $table->boolean('sponsored')->default(false);

            $table->unsignedInteger('sort_order')->default(0)->index();

            $table->json('meta')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brand_partner_links');
    }
};
