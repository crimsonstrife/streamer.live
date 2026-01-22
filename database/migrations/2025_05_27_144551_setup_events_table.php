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
        Schema::table('events', function (Blueprint $table) {
            $table->string('title')->nullable()->after('id');
            $table->dateTime('starts_at')->nullable()->after('title');
            $table->dateTime('ends_at')->nullable()->after('starts_at');
            $table->boolean('all_day')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('starts_at');
            $table->dropColumn('ends_at');
            $table->dropColumn('all_day');
        });
    }
};
