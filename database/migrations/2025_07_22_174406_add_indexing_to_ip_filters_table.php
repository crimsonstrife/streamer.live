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
        Schema::table('ip_filters', function (Blueprint $table) {
            $table->index(['type', 'ip_address'], 'ip_filters_type_address_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ip_filters', function (Blueprint $table) {
            $table->dropIndex('ip_filters_type_address_index');
        });
    }
};
