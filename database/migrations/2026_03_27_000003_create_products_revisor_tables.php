<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Indra\Revisor\Enums\RevisorContext;
use Indra\Revisor\Facades\Revisor;

return new class () extends Migration {
    public function up(): void
    {
        Revisor::createTableSchemas('products', function (Blueprint $table, RevisorContext $context) {
            $table->id();
            $table->string('provider_id')->index();
            $table->string('provider')->default('fourthwall');
            $table->string('name');
            $table->string('slug')->index();
            $table->text('description')->nullable();
            $table->string('state')->nullable();
            $table->string('access')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->decimal('compare_at_price', 10, 2)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('external_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Revisor::dropTableSchemasIfExists('products');
    }
};
