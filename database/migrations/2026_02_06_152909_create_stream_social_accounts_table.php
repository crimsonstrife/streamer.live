<?php

use App\Enums\StreamSocialPlatform;
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
        Schema::create('stream_social_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('platform')->index(); // cast to enum + validated in model w/ rules
            $table->string('name');
            $table->boolean('enabled')->default(true);
            $table->json('credentials'); // cast to encrypted:array in model
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stream_social_accounts');
    }
};
