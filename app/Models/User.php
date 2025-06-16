<?php

namespace App\Models;

use App\Models\AuthObjects\User as AuthUser;

class User extends AuthUser
{
    // This acts as a proxy so packages expecting App\Models\User still work
}
