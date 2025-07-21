<?php

namespace App\Console\Commands;

use App\Models\BlogObjects\Post;
use App\Models\Page;
use App\Models\StoreObjects\Product;
use App\Utilities\BlogHelper;
use App\Utilities\ShopHelper;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\SitemapGenerator;

class GenerateSitemap extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        // Manually create sitemap
        $sitemap = Sitemap::create();

        // Static pages
        $sitemap->add('/');

        // Dynamic pages
        $pages = Page::all();
        foreach ($pages as $page) {
            $sitemap->add($page->slug);
        }

        // Dynamic Product pages
        $products = Product::all();
        $sitemap->add($products);

        // Dynamic Post pages
        $posts = Post::published()->get();
        $sitemap->add($posts);

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
