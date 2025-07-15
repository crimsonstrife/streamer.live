<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ticket_messages', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('commented_on');
            $table->nullableMorphs('commented_by');
            $table->unsignedBigInteger('reply_id')->nullable()->index();
            $table->string('content');
            $table->boolean('is_public')->default(true);
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('deleted_by')->nullable()->constrained('users')->nullOnDelete();
        });

        Schema::table('ticket_messages', function (Blueprint $table) {
            $table->foreign('reply_id')->references('id')->on('ticket_messages')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket_messages', function (Blueprint $table) {
            $table->dropForeign(['reply_id']);
        });
        Schema::dropIfExists('ticket_messages');
    }
};
