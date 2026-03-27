<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Indra\Revisor\Enums\RevisorContext;
use Indra\Revisor\Facades\Revisor;

return new class () extends Migration {
    public function up(): void
    {
        Revisor::createTableSchemas('posts', function (Blueprint $table, RevisorContext $context) {
            $table->id();
            $table->foreignId('blog_author_id')->nullable()->constrained('blog_authors')->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->index();
            $table->text('excerpt')->nullable();
            $table->string('banner')->nullable();
            $table->longText('content');
            $table->boolean('comments_locked')->default(false);
            $table->boolean('is_announcement')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Revisor::dropTableSchemasIfExists('posts');
    }
};
