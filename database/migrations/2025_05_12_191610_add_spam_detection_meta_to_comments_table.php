<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->boolean('is_spam_auto')
                ->after('is_spam')
                ->default(false)
                ->comment('Flagged as spam by Akismet');
            $table->float('spam_score')->after('is_spam_auto')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn('is_spam_auto');
            $table->dropColumn('spam_score');
        });
    }
};
