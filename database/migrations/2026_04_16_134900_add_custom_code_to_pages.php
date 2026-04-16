<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Indra\Revisor\Enums\RevisorContext;
use Indra\Revisor\Facades\Revisor;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $baseTable = config('filament-fabricator.table_name', 'pages');

        $addColumns = function (Blueprint $table) {
            $table->text('custom_css')->nullable()->after('seo_description');
            $table->text('custom_head_html')->nullable()->after('custom_css');
        };

        // Alter the base table
        Schema::table($baseTable, $addColumns);

        // Alter all Revisor tables (drafts, versions, published)
        Revisor::alterTableSchemas($baseTable, function (Blueprint $table, RevisorContext $context) use ($addColumns) {
            $addColumns($table);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $baseTable = config('filament-fabricator.table_name', 'pages');
        $columns = ['custom_css', 'custom_head_html'];

        Schema::table($baseTable, function (Blueprint $table) use ($columns) {
            $table->dropColumn($columns);
        });

        Revisor::alterTableSchemas($baseTable, function (Blueprint $table, RevisorContext $context) use ($columns) {
            $table->dropColumn($columns);
        });
    }
};
