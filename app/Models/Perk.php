<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perk extends Model
{
    protected $fillable = ['name', 'description', 'source', 'is_enabled'];

    protected $casts = [
        'is_enabled' => 'boolean',
    ];

    public function supporterRoles()
    {
        return $this->belongsToMany(SupporterRole::class, 'supporter_role_perk')->withTimestamps();
    }
}
