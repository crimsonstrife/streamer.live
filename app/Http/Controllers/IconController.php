<?php

namespace App\Http\Controllers;

use App\Models\Icon;
use App\Models\User;
use App\Services\SvgSanitizerService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class IconController extends Controller
{
    /**
     * @throws Exception
     */
    public function store(Request $request): RedirectResponse
    {
        // Sanitize the SVG code before saving
        $sanitizer = app(SvgSanitizerService::class);
        $filePath = null;
        $code = null;

        // Validate the request
        $request->validate([
            'icon' => 'required|file|mimes:svg',
            'type' => 'required|string',
            'style' => 'required|string',
        ]);

        // Validate that the request has either a svg_code or a svg_file_path
        if (! $request->has('svg_code') && ! $request->hasFile('icon')) {
            return redirect()->back()->with('error', 'Please provide an icon file or SVG code.');
        }

        // Get the authenticated user and check if they have the relevant permission.
        $user = Auth::user();

        // Verify that the user is an instance of the User model
        if (! $user instanceof User) {
            Log::warning("User with ID {$user->id} is not a valid instance of the User Model.");

            return redirect()->back()->with('error', 'You do not have permission to upload icons.');
        }

        // Create the permission name dynamically based on the model name
        $permission = 'create-icon';

        // Only proceed if the user has the necessary permission
        if (! $user->can($permission)) {
            Log::warning("User with ID {$user->id} attempted to upload an icon without the necessary permission: {$permission}");

            return redirect()->back()->with('error', 'You do not have permission to upload icons.');
        }

        // If the request has an svg_file_path, save it
        if ($request->has('svg_file_path')) {
            // Save the uploaded file using the Icon model method
            $filePath = Icon::saveIconFile($request->file('icon'), $request->input('type'), $request->input('style'), $request->input('name'));
        } else {
            // Save the SVG code in the database
            $filePath = Icon::saveIconFile($request->input('svg_code'), $request->input('type'), $request->input('style'), $request->input('name'));
        }

        // Sanitize the svg_code if it is present
        if ($request->has('svg_code')) {
            $code = $sanitizer->sanitize($request->input('svg_code'));
        }

        // Save the icon details in the database
        Icon::create([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
            'style' => $request->input('style'),
            // Save the file path in the database, without any preceding slashes
            'svg_file_path' => ltrim($filePath, '/'),
            'svg_code' => $code ?? null,
        ]);

        return redirect()->back()->with('success', 'Icon uploaded successfully.');
    }

    /**
     * Fetch icons for the icon picker.
     *
     * @return JsonResponse
     */
    public function fetchIcons(Request $request)
    {
        // Optional filter variables
        $type = $request->query('type');
        $style = $request->query('style', null); // Can be null, especially if the style is custom
        $prefix = $request->query('prefix'); // Optional filter for prefix, not generally used in the icon picker as the type is sufficient
        $paginate = $request->query('paginate', 60); // Default to 60 icons per page if not specified
        $search = $request->query('search'); // Optional search query

        // Query icons with additional filters for non-empty values. Generally a search would look for all records matching the combination of filters provided i.e. AND condition
        $icons = Icon::query()
            ->when($type, function ($query, $type) {
                return $query->where('type', $type);
            })
            ->when($style, function ($query, $style) {
                return $query->where('style', $style);
            })
            ->when($prefix, function ($query, $prefix) {
                return $query->where('prefix', $prefix);
            })
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%"); // Search for icons with names containing the search query
            })
            ->paginate($paginate);

        // Render each icon preview HTML, filtering out any empty content
        $iconsHtml = $icons->map(function ($icon) {
            // Check for necessary attributes before rendering
            if (empty($icon->name) || empty($icon->prefix) || empty($icon->type)) {
                // Possible issue with the values being misinterpreted as empty or null if they are something like 0 or false, etc, so add a secondary check to ensure they are not null
                if ($icon->name === null || $icon->prefix === null || $icon->type === null) {
                    // Log which attribute failed the check
                    Log::error("Icon preview rendered as undefined or empty for icon ID: {$icon->id}".PHP_EOL.'Attributes: '.json_encode($icon->only(['name', 'prefix', 'type', 'style']), JSON_THROW_ON_ERROR));

                    return null;
                }

                // Check if the values are 0 or false, as these may be valid values in the case of names or prefixes
                if ($icon->name === '' || $icon->prefix === '' || $icon->type === '') {
                    // Log which attribute failed the check
                    Log::error("Icon preview rendered as undefined or empty for icon ID: {$icon->id}".PHP_EOL.'Attributes: '.json_encode($icon->only(['name', 'prefix', 'type', 'style']), JSON_THROW_ON_ERROR));

                    return null;
                }
            }

            // Render HTML
            $html = view('components.icon-picker-button', ['icon' => $icon])->render();

            if (! empty($html) && trim($html) !== 'undefined') {
                return $html;
            }

            Log::error("Icon preview rendered as undefined or empty for icon ID: {$icon->id}");

            return null;
        })->filter()->values(); // Filter and re-index

        // Return response with pagination details
        return response()->json([
            'icons' => $iconsHtml,
            'pagination' => [
                'total' => $icons->total(),
                'perPage' => $icons->perPage(),
                'currentPage' => $icons->currentPage(),
                'lastPage' => $icons->lastPage(),
                'hasMorePages' => $icons->hasMorePages(),
            ], // Add more pagination details as needed
        ], 200, ['Content-Type' => 'application/json']);
    }
}
