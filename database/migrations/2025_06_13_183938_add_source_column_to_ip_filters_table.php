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
            $table->enum('source', ['user', 'system', 'abuseipdb'])->after('type')->default('user')->comment('identifies if the filter was added manually or not');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ip_filters', function (Blueprint $table) {
            $table->dropColumn('source');
        });
    }
};
