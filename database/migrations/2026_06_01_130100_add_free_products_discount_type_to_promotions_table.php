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
                $table->dropColumn('discount_type');
            });
            Schema::table('promotions', function (Blueprint $table) {
                $table->enum('discount_type', ['PERCENTAGE', 'FIXED', 'FREE_SHIPPING', 'FREE_PRODUCTS']);
            });

            return;
        }

        DB::statement("ALTER TABLE `promotions` MODIFY COLUMN `discount_type` ENUM('PERCENTAGE','FIXED','FREE_SHIPPING','FREE_PRODUCTS') NOT NULL");
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'sqlite') {
            Schema::table('promotions', function (Blueprint $table) {
                $table->dropColumn('discount_type');
            });
            Schema::table('promotions', function (Blueprint $table) {
                $table->enum('discount_type', ['PERCENTAGE', 'FIXED', 'FREE_SHIPPING']);
            });

            return;
        }

        DB::statement("ALTER TABLE `promotions` MODIFY COLUMN `discount_type` ENUM('PERCENTAGE','FIXED','FREE_SHIPPING') NOT NULL");
    }
};
