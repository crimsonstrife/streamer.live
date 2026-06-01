<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('promotions', function (Blueprint $table) {
            $table->boolean('show_on_storefront')->default(true)->after('status');
        });

        DB::table('promotions')
            ->where('discount_type', 'FREE_PRODUCTS')
            ->update(['show_on_storefront' => false]);
    }

    public function down(): void
    {
        Schema::table('promotions', function (Blueprint $table) {
            $table->dropColumn('show_on_storefront');
        });
    }
};
