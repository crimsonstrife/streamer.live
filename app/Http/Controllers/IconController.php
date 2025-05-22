<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIconRequest;
use App\Models\Icon;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IconController extends Controller
{
    /**
     * @throws Exception
     */
    public function store(StoreIconRequest $request)
    {
        // At this point you know the user is authorized and the input is valid.
        // Decide source & call your model helper:
        $source = $request->file('icon') ?? $request->input('svg_code');
        $path = Icon::saveIconFile(
            $source,
            $request->type,
            $request->style,
            $request->name,
        );

        // Create and persist:
        Icon::create([
            'name' => $request->name,
            'type' => $request->type,
            'style' => $request->style,
            'svg_file_path' => $path,
            'svg_code' => $request->svg_code,
        ]);

        return redirect()
            ->back()
            ->withToast('success', 'Icon uploaded successfully.');
    }

    /**
     * Fetch icons for the icon picker.
     */
    public function fetchIcons(Request $request): JsonResponse
    {
        $icons = Icon::query()
            ->when($request->type, fn ($q, $v) => $q->where('type', $v))
            ->when($request->style, fn ($q, $v) => $q->where('style', $v))
            ->when($request->search, fn ($q, $v) => $q->where('name', 'like', "%{$v}%"))
            ->paginate($request->integer('per_page', 60))
            ->through(fn (Icon $icon) => [
                'id' => $icon->id,
                'name' => $icon->name,
                'prefix' => $icon->prefix,
                'url' => $icon->svg_url,    // or svg_code
            ]);

        return response()->json([
            'data' => $icons->items(),
            'current_page' => $icons->currentPage(),
            'last_page' => $icons->lastPage(),
            'per_page' => $icons->perPage(),
        ]);
    }
}
