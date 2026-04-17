<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Indra\Revisor\Enums\RevisorContext;
use Indra\Revisor\Facades\Revisor;

return new class () extends Migration {
    public function up(): void
    {
        Revisor::createTableSchemas('content_entries', function (Blueprint $table, RevisorContext $context) {
            $table->id();
            $table->foreignId('content_type_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->index();
            $table->json('data')->nullable();
            $table->integer('sort_order')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['content_type_id', 'slug']);
        });
    }

    public function down(): void
    {
        Revisor::dropTableSchemasIfExists('content_entries');
    }
};
