<?php

namespace App\Http\Controllers;

use App\Models\Emote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmoteController extends Controller
{
    public function index(Request $request)
    {
        $q = $request->get('query', '');
        $matches = Emote::where('code', 'like', "%{$q}%")
            ->limit(50)
            ->get()
            ->map(fn ($e) => [
                'code'   => $e->code,
                'url'    => asset("{$e->image_path}"),
                'keywords' => $e->keywords, // if you need them
            ]);

        return response()->json($matches);
    }
}
