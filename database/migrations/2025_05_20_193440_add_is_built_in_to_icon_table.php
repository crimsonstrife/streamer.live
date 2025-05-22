<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration to add the 'is_builtin' column to the 'icons' table.
 *
 * This migration creates a new column 'is_builtin' in the 'icons' table
 * to indicate whether an icon is built-in or not.
 *
 * @return void
 */
return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('icons', function (Blueprint $table) {
            // Update the icons table to add a column to indicate if the icon is built-in or user-uploaded
            $table->boolean('is_builtin')->default(false)->after('style')->nullable()->comment('Indicates if the icon is built-in or user-uploaded');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('icons', function (Blueprint $table) {
            // Drop the column
            $table->dropColumn('is_builtin');
        });
    }
};
