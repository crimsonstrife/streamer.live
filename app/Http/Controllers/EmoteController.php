<?php

namespace App\Http\Controllers;

use App\Models\Emote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class EmoteController extends Controller
{
    public function index(Request $request)
    {
        $q = $request->get('query', '');

        $cacheKey = $q
            ? 'emotes:search:'.md5($q)
            : 'emotes:all';

        // Cache for 10 minutes; adjust duration as needed
        $matches = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($q) {
            return Emote::when(
                $q,
                fn ($query) => $query->where('code', 'like', "%{$q}%")
            )
                ->limit(50)
                ->get()
                ->map(fn ($e) => [
                    'code' => $e->code,
                    'url' => Storage::url($e->image_path),
                    'keywords' => $e->keywords,
                ]);
        });

        return response()->json($matches);
    }
}
