<x-guest-layout>
    @php
        $term = request('query');
    @endphp
    @push('styles')
        <style>
            .card-img-top {
                max-height: 180px;
                object-fit: cover;
            }
        </style>
    @endpush
    <div class="container mt-4">
        <h2 class="fw-semibold fs-4 text-dark">
            Search Results for "{{ $term }}"
        </h2>
    </div>
    <div class="container mt-4">
        @if($results->isEmpty())
            <p>No results found.</p>
        @else
            <ul class="list-group">
                @foreach ($results->groupBy(fn($r) => class_basename(get_class($r->searchable))) as $type => $group)
                    <h3 class="mt-4">{{ $type }}</h3>
                    <div class="row">
                        @foreach ($group as $result)
                            @php
                                $item = $result->searchable;
                            @endphp

                            <div class="col-md-4 mb-4">
                                <div class="card h-100">
                                    @if ($type === 'Product' && $item->primary_image_url)
                                        @php
                                            if ($item->images->isNotEmpty())
                                                {
                                                    $image = $item->images->first();
                                                }
                                            else
                                                {
                                                    $image = null;
                                                }
                                        @endphp
                                        @if ($item->images->isNotEmpty())
                                            <img src="{!! asset($image->local_path) ?? $image->url !!}"
                                                 class="card-img-top" alt="{{ $image->alt_text }}">
                                        @endif
                                    @elseif ($type === 'Post' && $item->featured_image)
                                        <img src="{{ asset($item->featured_image) }}" class="card-img-top"
                                             alt="{{ $item->title }}">
                                    @endif

                                    <div class="card-body">
                                        <h5 class="card-title">
                                            <a href="{{ $result->url }}">{{ $result->title }}</a>
                                        </h5>

                                        {{-- Product Metadata --}}
                                        @if ($type === 'Product')
                                            <p class="text-muted mb-1">{{ $item->symbol_price ?? '$0.00' }}</p>
                                        @endif

                                        {{-- Post Metadata --}}
                                        @if ($type === 'Post')
                                            <p class="text-muted small">
                                                {{ $item->comments_count ?? $item->comments?->count() ?? 0 }} Comments
                                            </p>
                                        @endif

                                        {{-- Common Highlight Snippet --}}
                                        <p class="card-text small text-muted">
                                            {!! App\Utilities\Helpers::highlight_search_match(
                                                strip_tags($item->excerpt ?? $item->content ?? $item->description ?? ''),
                                                $term
                                            ) !!}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endforeach
            </ul>
        @endif
    </div>
</x-guest-layout>

