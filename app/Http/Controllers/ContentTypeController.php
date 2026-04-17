<?php

namespace App\Http\Controllers;

use App\Models\ContentObjects\ContentEntry;
use App\Models\ContentObjects\ContentType;
use Illuminate\Http\Request;

class ContentTypeController extends Controller
{
    /**
     * Resolve the content type slug from route defaults since it isn't a URL parameter.
     */
    private function resolveContentTypeSlug(Request $request): string
    {
        return $request->route()->defaults['contentTypeSlug'];
    }

    /**
     * Display a paginated list of entries for a content type.
     */
    public function index(Request $request)
    {
        $contentType = ContentType::where('slug', $this->resolveContentTypeSlug($request))
            ->where('is_active', true)
            ->firstOrFail();

        $entries = ContentEntry::where('content_type_id', $contentType->id)
            ->withPublishedContext()
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->paginate(12);

        $fields = $contentType->getActiveFields();

        $layout = $contentType->getDefaultLayout('list');
        $view = $layout ? $layout->getView() : 'content-types._default-list';

        return view($view, compact('contentType', 'entries', 'fields'));
    }

    /**
     * Display a single content entry.
     */
    public function show(Request $request, string $entrySlug)
    {
        $contentType = ContentType::where('slug', $this->resolveContentTypeSlug($request))
            ->where('is_active', true)
            ->firstOrFail();

        $entry = ContentEntry::where('content_type_id', $contentType->id)
            ->where('slug', $entrySlug)
            ->withPublishedContext()
            ->firstOrFail();

        $fields = $contentType->getActiveFields();

        $layout = $contentType->getDefaultLayout('detail');
        $view = $layout ? $layout->getView() : 'content-types._default-detail';

        return view($view, compact('contentType', 'entry', 'fields'));
    }
}
