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
        Schema::table('product_variants', function (Blueprint $table) {
            $table->string('description')->nullable()->after('name');
            $table->string('color_name')->nullable()->after('description');
            $table->string('color_swatch')->nullable()->after('color_name');
            $table->string('size')->nullable()->after('color_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('color_name');
            $table->dropColumn('color_swatch');
            $table->dropColumn('size');
        });
    }
};
