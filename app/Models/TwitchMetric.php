<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TwitchMetric extends Model
{
    protected $fillable = ['metric', 'value', 'recorded_at'];
    public $timestamps = true;
}
