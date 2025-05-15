<?php

namespace App\Models;

class SpamFilterPattern extends BaseModel
{
    protected $fillable = ['list', 'pattern', 'description'];
}
