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
        Schema::table('users', function (Blueprint $table) {
            $table->string('patreon_email')->nullable()->after('patreon_id');
            $table->text('patreon_access_token')->nullable()->after('patreon_email');
            $table->text('patreon_refresh_token')->nullable()->after('patreon_access_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['patreon_email', 'patreon_access_token', 'patreon_refresh_token']);
        });
    }
};
