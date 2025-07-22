<?php

namespace App\Models\SecurityObjects;

use App\Models\BaseModel;
use Illuminate\Support\Facades\Cache;

class IPFilter extends BaseModel
{
    protected $fillable = ['ip_address', 'type', 'reason', 'source'];

    protected $table = 'ip_filters';

    protected static function booted()
    {
        static::saved(function () {
            Cache::forget('ip_filter:blacklist');
            Cache::forget('ip_filter:whitelist');
        });
        static::deleted(function () {
            Cache::forget('ip_filter:blacklist');
            Cache::forget('ip_filter:whitelist');
        });
    }

    public static function rules(): array
    {
        return [
            'ip_address' => 'required|ip',
        ];
    }
}
