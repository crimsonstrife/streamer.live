<?php

namespace App\Models\SecurityObjects;

use App\Models\BaseModel;

class IPFilter extends BaseModel
{
    protected $fillable = ['ip_address', 'type', 'reason', 'source'];

    protected $table = 'ip_filters';

    public static function rules(): array
    {
        return [
            'ip_address' => 'required|ip',
        ];
    }
}
