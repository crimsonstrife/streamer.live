<?php

namespace App\Http\Controllers;

use App\Search\Aspects\PageSearchAspect;
use App\Search\Aspects\PostSearchAspect;
use App\Search\Aspects\ProductSearchAspect;
use Illuminate\Http\Request;
use Spatie\Searchable\Search;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $results = (new Search)
            ->registerAspect(PostSearchAspect::class)
            ->registerAspect(ProductSearchAspect::class)
            ->registerAspect(PageSearchAspect::class)
            ->search($request->input('query'));

        // Manually sort by score if it exists
        $sortedResults = $results->sortByDesc(function ($result) {
            return property_exists($result, 'search_score') ? $result->search_score : 0;
        });

        return view('search.results', ['results' => $sortedResults]);
    }
}
