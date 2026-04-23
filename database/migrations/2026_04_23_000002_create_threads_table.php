<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('threads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();

            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('body');

            $table->timestamp('pinned_until')->nullable();
            $table->boolean('is_locked')->default(false);

            $table->string('approval_status', 16)->default('pending');
            $table->foreignId('approval_reviewed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('approval_reviewed_at')->nullable();
            $table->text('approval_notes')->nullable();

            $table->timestamp('last_activity_at')->nullable();
            $table->unsignedInteger('posts_count')->default(0);
            $table->unsignedInteger('views_count')->default(0);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['category_id', 'approval_status']);
            $table->index('approval_status');
            $table->index('pinned_until');
            $table->index('last_activity_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('threads');
    }
};
