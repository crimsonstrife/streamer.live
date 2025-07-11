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
        Schema::table('comments', function (Blueprint $table) {
            // rename the existing text column to content:
            $table->renameColumn('text', 'content');
            // then change it from TEXT to VARCHAR(255):
            $table->string('content')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            // reverse: make it TEXT again
            $table->text('content')->change();
            // rename back:
            $table->renameColumn('content', 'text');
        });
    }
};
