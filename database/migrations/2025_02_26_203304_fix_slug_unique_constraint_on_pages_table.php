<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table(config('filament-fabricator.table_name', 'pages'), function (Blueprint $table) {
            // check if 'pages_slug_unique' index exists
            if (Schema::hasIndex(config('filament-fabricator.table_name', 'pages'), 'pages_slug_unique')) {
                $table->dropUnique(['slug']);
            }
            $table->unique(['slug', 'parent_id']);
        });
    }

    public function down()
    {
        Schema::table(config('filament-fabricator.table_name', 'pages'), function (Blueprint $table) {
            $table->dropUnique(['slug', 'parent_id']);
            $table->unique(['slug']);
        });
    }
};
