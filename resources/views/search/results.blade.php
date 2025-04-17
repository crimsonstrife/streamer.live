<x-guest-layout>
    @php
        $term = request('query');
        $topResults = $results->sortByDesc('search_score')->take(5);
    @endphp

    @push('styles')
        <style>
            .card-img-top {
                max-height: 180px;
                object-fit: cover;
            }

            .badge-match {
                font-size: 0.7rem;
                margin-right: 4px;
            }
        </style>
    @endpush

    <div class="container mt-4">
        <h2 class="fw-semibold fs-4 text-dark">Search Results for "{{ $term }}"</h2>
    </div>

    <div class="container mt-4">
        @if($results->isEmpty())
            <p>No results found.</p>
        @else
            {{-- Top Matches --}}
            @if($topResults->isNotEmpty())
                <h3 class="mt-4">Top Matches</h3>
                <div class="row">
                    @foreach ($topResults as $result)
                        @include('search.partials.result-card', ['result' => $result, 'term' => $term])
                    @endforeach
                </div>
            @endif

            {{-- Grouped Results --}}
            @foreach ($results->groupBy(fn($r) => class_basename(get_class($r->searchable))) as $type => $group)
                <h3 class="mt-5">{{ $type }}</h3>
                <div class="row">
                    @foreach ($group as $result)
                        @include('search.partials.result-card', ['result' => $result, 'term' => $term])
                    @endforeach
                </div>
            @endforeach
        @endif
    </div>
</x-guest-layout>
