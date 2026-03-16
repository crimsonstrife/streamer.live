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
        Schema::create('brand_partners', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('slug')->unique();

            $table->string('type', 30)->default('partner')->index(); // partner | affiliate | sponsor
            $table->string('status', 30)->default('draft')->index(); // draft | active | archived

            $table->string('headline')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('body')->nullable();

            $table->string('badge')->nullable();
            $table->string('cta_label')->nullable();

            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_active')->default(true)->index();

            $table->boolean('show_disclosure')->default(false);
            $table->text('disclosure_text')->nullable();

            $table->unsignedInteger('sort_order')->default(0)->index();

            $table->timestamp('starts_at')->nullable()->index();
            $table->timestamp('ends_at')->nullable()->index();

            $table->json('meta')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brand_partners');
    }
};
