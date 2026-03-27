<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use App\Models\BlogObjects\Post;
use Illuminate\Database\Eloquent\Model;
use Indra\RevisorFilament\Filament\ViewVersion;

class ViewPostVersion extends ViewVersion
{
    protected static string $resource = PostResource::class;

    /**
     * Revisor's ViewVersionTableAction passes the integer record_id in the URL,
     * but Post routes by slug. When given a numeric key, look up by primary key
     * in draft context; otherwise fall back to the default slug-based resolution.
     */
    protected function resolveRecord(int|string $key): Model
    {
        if (is_numeric($key)) {
            return Post::withDraftContext()->findOrFail((int) $key);
        }

        return parent::resolveRecord($key);
    }
}
