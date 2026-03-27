<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        if (DB::connection()->getDriverName() === 'sqlite') {
            Schema::table('promotions', function (Blueprint $table) {
                $table->dropColumn('status');
            });
            Schema::table('promotions', function (Blueprint $table) {
                $table->enum('status', ['Live', 'Draft', 'Archived', 'Ended'])->default('Draft');
            });
        } else {
            DB::statement("ALTER TABLE `promotions` MODIFY COLUMN `status` ENUM('Live','Draft','Archived','Ended') NOT NULL DEFAULT 'Draft'");
        }
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'sqlite') {
            Schema::table('promotions', function (Blueprint $table) {
                $table->dropColumn('status');
            });
            Schema::table('promotions', function (Blueprint $table) {
                $table->enum('status', ['Live', 'Draft', 'Archived'])->default('Draft');
            });
        } else {
            DB::statement("ALTER TABLE `promotions` MODIFY COLUMN `status` ENUM('Live','Draft','Archived') NOT NULL DEFAULT 'Draft'");
        }
    }
};
