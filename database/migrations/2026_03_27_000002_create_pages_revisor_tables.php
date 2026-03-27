<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Indra\Revisor\Enums\RevisorContext;
use Indra\Revisor\Facades\Revisor;

return new class () extends Migration {
    public function up(): void
    {
        $baseTable = config('filament-fabricator.table_name', 'pages');

        Revisor::createTableSchemas($baseTable, function (Blueprint $table, RevisorContext $context) use ($baseTable) {
            $table->id();
            $table->string('title')->index();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('slug')->index();
            $table->string('layout')->default('default')->index();
            $table->json('blocks');
            $table->enum('type', ['shop', 'product_detail', 'collection_detail', 'blog', 'blog_detail'])->nullable();
            $table->unsignedBigInteger('parent_id')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Revisor::dropTableSchemasIfExists(config('filament-fabricator.table_name', 'pages'));
    }
};
