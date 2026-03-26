<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class () extends Migration {
    public function up(): void
    {
        DB::statement("ALTER TABLE `promotions` MODIFY COLUMN `status` ENUM('Live','Draft','Archived','Ended') NOT NULL DEFAULT 'Draft'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE `promotions` MODIFY COLUMN `status` ENUM('Live','Draft','Archived') NOT NULL DEFAULT 'Draft'");
    }
};
