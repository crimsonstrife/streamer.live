<?php

namespace App\Traits;

use Cocur\Slugify\Slugify;

trait HasSlug
{
    public static function bootHasSlug()
    {
        static::creating(function ($model) {
            $model->generateSlug();
        });

        static::updating(function ($model) {
            $model->generateSlug();
        });

        static::saving(function ($model) {
            $model->generateSlug();
        });
    }

    protected function generateSlug()
    {
        if (empty($this->slug) && !empty($this->{$this->slugSourceColumn()})) {
            $slugify = new Slugify();
            $baseSlug = $slugify->slugify($this->{$this->slugSourceColumn()});
            $slug = $baseSlug;

            $count = 1;
            while (self::where('slug', $slug)->exists()) {
                $slug = "{$baseSlug}-{$count}";
                $count++;
            }

            $this->slug = $slug;
        }
    }

    /**
     * Get the column that serves as the source for the slug.
     * Default is 'title', but it can be customized per model.
     */
    protected function slugSourceColumn(): string
    {
        return $this->slugSource ?? 'title';
    }
}
