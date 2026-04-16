@php
    $data = [
        'page'        => null,
        'post'        => null,
        'title'       => $contentType->name,
        'description' => $contentType->description ?? $contentType->name,
        'keywords'    => '',
        'image'       => null,
        'imageAlt'    => null,
        'author'      => '',
        'type'        => 'page',
        'category'    => 'content',
        'date'        => now()->toIso8601String(),
    ];
@endphp
{!! App\View\Helpers\LayoutSection::header(null, $data) !!}

    <main class="flex-grow-1">
        <div class="container py-4">
            <h1 class="mb-4">{{ $contentType->name }}</h1>

            @if($contentType->description)
                <p class="lead text-muted mb-4">{{ $contentType->description }}</p>
            @endif

            @if($entries->isEmpty())
                <p class="text-muted">No {{ strtolower($contentType->name) }} found.</p>
            @else
                <div class="row g-4">
                    @foreach($entries as $entry)
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <a href="{{ route("content-type.{$contentType->slug}.show", $entry->slug) }}"
                                           class="text-decoration-none">
                                            {{ $entry->title }}
                                        </a>
                                    </h5>

                                    @foreach($fields->take(3) as $field)
                                        @php $value = $entry->getFieldValue($field->name); @endphp
                                        @if($value && !is_array($value))
                                            <x-content-field :field="$field" :value="$value" :summary="true" />
                                        @endif
                                    @endforeach
                                </div>
                                <div class="card-footer text-muted small">
                                    {{ $entry->created_at->diffForHumans() }}
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="mt-4">
                    {{ $entries->links() }}
                </div>
            @endif
        </div>
    </main>
</div>
@stack('modals')
{!! App\View\Helpers\LayoutSection::footer(null) !!}
