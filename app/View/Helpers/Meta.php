<?php

namespace App\View\Helpers;

use Carbon\Carbon;
use Illuminate\View\Component;
use Illuminate\View\View;

class Meta extends Component
{
    public ?string $title = null;

    public ?string $description = null;

    public ?string $keywords = null;

    public ?string $author = null;

    public ?string $image = null;

    public ?string $type = null;

    public ?string $category = null;

    public ?string $date = null;

    public function __construct()
    {
        $sections = app()->view->getSections();

        $this->title = $sections['title'] ?? $this->multiLang(setting('site_name'));
        $this->description = $sections['description'] ?? $this->multiLang(setting('site_description'));
        $this->keywords = $sections['keywords'] ?? $this->multiLang(setting('site_keywords'));
        $this->author = $sections['author'] ?? $this->multiLang(setting('site_author'));
        $this->image = $sections['image'] ?? url('storage/'.setting('site_profile'));
        $this->type = $sections['type'] ?? 'website';
        $this->category = $sections['category'] ?? 'news';
        $this->date = $sections['date'] ?? Carbon::now()->toDateTimeString();
    }

    private function multiLang($value)
    {
        return app()->getLocale() === 'en' ? str($value)->explode('|')[0] ?? $value : str($value)->explode('|')[1] ?? $value;
    }

    public function render(): View
    {
        return view('components.seo.tags');
    }
}
