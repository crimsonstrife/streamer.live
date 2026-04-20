<?php

use App\Models\BlogObjects\Post;
use App\Models\Page;
use App\Models\StoreObjects\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Copies all existing records from the base tables into the Revisor draft
 * tables and immediately publishes them so the site continues to serve
 * content after Revisor is activated (default context = Published).
 */
return new class () extends Migration {
    public function up(): void
    {
        $revisorDefaults = [
            'is_published'   => false,
            'published_at'   => null,
            'publisher_type' => null,
            'publisher_id'   => null,
            'is_current'     => false,
            'version_number' => null,
        ];

        // ── Posts ────────────────────────────────────────────────────────────
        DB::table('posts')->lazyById()->each(function ($row) use ($revisorDefaults) {
            $data = (array) $row;
            unset($data['published_at']); // was a date; Revisor manages its own timestamp

            DB::table('posts_drafts')->insertOrIgnore(array_merge($data, $revisorDefaults));

            Post::withDraftContext()->find($data['id'])?->publish();
        });

        // ── Pages ─────────────────────────────────────────────────────────────
        $pagesTable = config('filament-fabricator.table_name', 'pages');

        DB::table($pagesTable)->lazyById()->each(function ($row) use ($pagesTable, $revisorDefaults) {
            DB::table($pagesTable . '_drafts')->insertOrIgnore(
                array_merge((array) $row, $revisorDefaults)
            );

            Page::withDraftContext()->find($row->id)?->publish();
        });

        // ── Products ──────────────────────────────────────────────────────────
        DB::table('products')->lazyById()->each(function ($row) use ($revisorDefaults) {
            DB::table('products_drafts')->insertOrIgnore(
                array_merge((array) $row, $revisorDefaults)
            );

            Product::withDraftContext()->find($row->id)?->publish();
        });
    }

    public function down(): void
    {
        // Unpublishing is destructive for a rollback; intentionally left empty.
        // To roll back, drop the revisor tables via the previous migrations.
    }
};
