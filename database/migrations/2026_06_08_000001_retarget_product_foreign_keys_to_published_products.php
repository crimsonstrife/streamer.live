<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    private const PUBLISHED_PRODUCTS_TABLE = 'products_published';

    private const LEGACY_PRODUCTS_TABLE = 'products';

    /**
     * Retarget product foreign keys to Revisor's published product table.
     */
    public function up(): void
    {
        if (! Schema::hasTable(self::PUBLISHED_PRODUCTS_TABLE)) {
            return;
        }

        $this->retargetRequiredProductForeignKey('collection_products', 'cascade', self::PUBLISHED_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('product_variants', 'cascade', self::PUBLISHED_PRODUCTS_TABLE);
        $this->retargetNullableProductForeignKey('product_images', 'cascade', self::PUBLISHED_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('additional_product_data', null, self::PUBLISHED_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('product_reviews', 'cascade', self::PUBLISHED_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('promotion_product', 'cascade', self::PUBLISHED_PRODUCTS_TABLE);
        $this->retargetNullableProductForeignKey('fourthwall_giveaway_packages', 'null', self::PUBLISHED_PRODUCTS_TABLE);
        $this->retargetNullableProductForeignKey('fourthwall_giveaway_links', 'null', self::PUBLISHED_PRODUCTS_TABLE);
    }

    /**
     * Restore product foreign keys to the legacy products table.
     */
    public function down(): void
    {
        if (! Schema::hasTable(self::LEGACY_PRODUCTS_TABLE)) {
            return;
        }

        $this->retargetRequiredProductForeignKey('collection_products', 'cascade', self::LEGACY_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('product_variants', 'cascade', self::LEGACY_PRODUCTS_TABLE);
        $this->retargetNullableProductForeignKey('product_images', 'cascade', self::LEGACY_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('additional_product_data', null, self::LEGACY_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('product_reviews', 'cascade', self::LEGACY_PRODUCTS_TABLE);
        $this->retargetRequiredProductForeignKey('promotion_product', 'cascade', self::LEGACY_PRODUCTS_TABLE);
        $this->retargetNullableProductForeignKey('fourthwall_giveaway_packages', 'null', self::LEGACY_PRODUCTS_TABLE);
        $this->retargetNullableProductForeignKey('fourthwall_giveaway_links', 'null', self::LEGACY_PRODUCTS_TABLE);
    }

    private function retargetRequiredProductForeignKey(string $tableName, ?string $onDelete, string $targetTable): void
    {
        if (! $this->canRetarget($tableName, $targetTable)) {
            return;
        }

        $this->deleteOrphanedProductRows($tableName, $targetTable);
        $this->dropProductForeignKey($tableName);
        $this->addProductForeignKey($tableName, $targetTable, $onDelete);
    }

    private function retargetNullableProductForeignKey(string $tableName, ?string $onDelete, string $targetTable): void
    {
        if (! $this->canRetarget($tableName, $targetTable)) {
            return;
        }

        $this->nullOrphanedProductRows($tableName, $targetTable);
        $this->dropProductForeignKey($tableName);
        $this->addProductForeignKey($tableName, $targetTable, $onDelete);
    }

    private function canRetarget(string $tableName, string $targetTable): bool
    {
        return Schema::hasTable($tableName)
            && Schema::hasColumn($tableName, 'product_id')
            && Schema::hasTable($targetTable);
    }

    private function deleteOrphanedProductRows(string $tableName, string $targetTable): void
    {
        DB::table($tableName)
            ->whereNotIn('product_id', DB::table($targetTable)->select('id'))
            ->delete();
    }

    private function nullOrphanedProductRows(string $tableName, string $targetTable): void
    {
        DB::table($tableName)
            ->whereNotNull('product_id')
            ->whereNotIn('product_id', DB::table($targetTable)->select('id'))
            ->update(['product_id' => null]);
    }

    private function dropProductForeignKey(string $tableName): void
    {
        Schema::table($tableName, function (Blueprint $table) {
            $table->dropForeign(['product_id']);
        });
    }

    private function addProductForeignKey(string $tableName, string $targetTable, ?string $onDelete): void
    {
        Schema::table($tableName, function (Blueprint $table) use ($targetTable, $onDelete) {
            $foreign = $table->foreign('product_id')->references('id')->on($targetTable);

            match ($onDelete) {
                'cascade' => $foreign->cascadeOnDelete(),
                'null' => $foreign->nullOnDelete(),
                default => $foreign,
            };
        });
    }
};
