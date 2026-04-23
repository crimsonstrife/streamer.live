<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('thread_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thread_id')
                ->constrained('threads')
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('reply_to_post_id')
                ->nullable()
                ->constrained('thread_posts')
                ->nullOnDelete();

            $table->longText('body');
            $table->string('approval_status', 16)->default('approved');

            $table->timestamps();
            $table->softDeletes();

            $table->index(['thread_id', 'created_at']);
            $table->index('approval_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thread_posts');
    }
};
