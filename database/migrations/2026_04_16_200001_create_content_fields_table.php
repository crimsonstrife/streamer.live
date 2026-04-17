<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('content_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_type_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('label');
            $table->string('type');
            $table->boolean('is_required')->default(false);
            $table->boolean('is_searchable')->default(false);
            $table->boolean('show_in_table')->default(true);
            $table->json('options')->nullable();
            $table->string('validation_rules')->nullable();
            $table->text('default_value')->nullable();
            $table->integer('sort_order')->default(0);
            $table->integer('column_span')->default(2);
            $table->timestamps();

            $table->index(['content_type_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_fields');
    }
};
