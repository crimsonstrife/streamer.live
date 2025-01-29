<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupporterRole extends Model
{
    protected $fillable = ['name', 'source', 'description'];

    public function perks()
    {
        return $this->belongsToMany(Perk::class, 'supporter_role_perk')->withTimestamps();
    }
}
