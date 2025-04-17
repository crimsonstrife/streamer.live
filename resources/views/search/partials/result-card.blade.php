@php
    $item = $result->searchable;
    $type = class_basename($item);
@endphp

<div class="col-md-4 mb-4">
    <div class="card h-100">
        {{-- Image --}}
        @if ($type === 'Product' && $item->images->isNotEmpty())
            <img src="{{ asset($item->images->first()->local_path ?? $item->images->first()->url) }}"
                 class="card-img-top" alt="{{ $item->images->first()->alt_text ?? $item->name }}">
        @elseif ($type === 'Post' && $item->featured_image)
            <img src="{{ asset($item->featured_image) }}" class="card-img-top" alt="{{ $item->title }}">
        @endif

        <div class="card-body">
            <h5 class="card-title">
                <a href="{{ $result->url }}">{{ $result->title }}</a>
            </h5>

            {{-- Matched Fields --}}
            @if (!empty($item->matched_fields))
                <p class="mb-2">
                    @foreach ($item->matched_fields as $field)
                        <span class="badge bg-secondary badge-match">{{ $field }}</span>
                    @endforeach
                </p>
            @endif

            {{-- Product Metadata --}}
            @if ($type === 'Product')
                <p class="text-muted mb-1">{{ $item->symbol_price ?? '$0.00' }}</p>
            @endif

            {{-- Post Metadata --}}
            @if ($type === 'Post')
                <p class="text-muted small">{{ $item->comments_count ?? $item->comments?->count() ?? 0 }} Comments</p>
            @endif

            {{-- Highlighted Snippet --}}
            <p class="card-text small text-muted">
                {!! App\Utilities\Helpers::highlight_search_match(
                    strip_tags($item->excerpt ?? $item->content ?? $item->description ?? ''),
                    $term
                ) !!}
            </p>
        </div>
    </div>
</div>
