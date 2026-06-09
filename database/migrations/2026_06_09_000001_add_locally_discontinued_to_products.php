<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Indra\Revisor\Facades\Revisor;

return new class () extends Migration {
    public function up(): void
    {
        Revisor::alterTableSchemas('products', function (Blueprint $table) {
            $table->boolean('is_locally_discontinued')->default(false)->after('is_featured');
            $table->text('locally_discontinued_note')->nullable()->after('is_locally_discontinued');
        });
    }

    public function down(): void
    {
        Revisor::alterTableSchemas('products', function (Blueprint $table) {
            $table->dropColumn(['is_locally_discontinued', 'locally_discontinued_note']);
        });
    }
};
