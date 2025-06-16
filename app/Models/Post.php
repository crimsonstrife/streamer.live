<?php

namespace App\Models;

use App\Models\BlogObjects\Post as BlogPost;

class Post extends BlogPost
{
    // This acts as a proxy so packages expecting App\Models\Post still work
}
