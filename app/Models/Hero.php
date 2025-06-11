<?php

namespace App\Models;

use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    use HasFactory;
    use IsPermissible;

    protected $fillable = [
        'title',
        'subtitle',
        'background_image',
        'primary_cta_text',
        'primary_cta_url',
        'secondary_cta_text',
        'secondary_cta_url',
        'sort_order',
        'is_active',
        'full_width',
        'show_socials',
    ];

    protected $table = 'hero_banners';

    protected $appends = [
        'background_image_url',
    ];

    public function getBackgroundImageURLAttribute(): object|string
    {
        return url($this->background_image);
    }
}
