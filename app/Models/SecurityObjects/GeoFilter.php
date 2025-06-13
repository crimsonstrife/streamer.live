<?php

namespace App\Models\SecurityObjects;

use App\Models\BaseModel;

class GeoFilter extends BaseModel
{
    protected $table = 'geo_filters';
    protected $fillable = ['country_code', 'type', 'reason'];

    public static function rules(): array
    {
        return [
            'country_code' => 'required|string|size:2',
            'type'         => 'required|in:whitelist,blacklist',
        ];
    }
}
