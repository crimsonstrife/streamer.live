<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Indra\Revisor\Facades\Revisor;

return new class () extends Migration {
    /**
     * Add a nullable `pinned_until` timestamp to every Revisor-managed posts
     * table (draft / published / versions) so community-hub pinning survives
     * the full draft → publish → version lifecycle.
     */
    public function up(): void
    {
        Revisor::alterTableSchemas('posts', function (Blueprint $table) {
            $table->timestamp('pinned_until')->nullable()->after('is_announcement');
            $table->index('pinned_until');
        });
    }

    public function down(): void
    {
        Revisor::alterTableSchemas('posts', function (Blueprint $table) {
            $table->dropIndex(['pinned_until']);
            $table->dropColumn('pinned_until');
        });
    }
};
