@php
    $data = [
        'page'        => null,
        'post'        => null,
        'title'       => $entry->title . ' - ' . $contentType->name,
        'description' => Str::limit(strip_tags(collect($entry->data)->first(fn ($v) => is_string($v) && strlen($v) > 20) ?? $entry->title), 160),
        'keywords'    => '',
        'image'       => null,
        'imageAlt'    => null,
        'author'      => '',
        'type'        => 'article',
        'category'    => $contentType->singular_name,
        'date'        => $entry->created_at->toIso8601String(),
    ];
@endphp
{!! App\View\Helpers\LayoutSection::header(null, $data) !!}

    <main class="flex-grow-1">
        <div class="container py-4">
            <nav aria-label="breadcrumb" class="mb-3">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route("content-type.{$contentType->slug}.index") }}">{{ $contentType->name }}</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{ $entry->title }}</li>
                </ol>
            </nav>

            <h1 class="mb-4">{{ $entry->title }}</h1>

            <div class="row">
                <div class="col-lg-8">
                    @foreach($fields as $field)
                        @php $value = $entry->getFieldValue($field->name); @endphp
                        @if($value !== null && $value !== '' && $value !== [])
                            <x-content-field :field="$field" :value="$value" />
                        @endif
                    @endforeach
                </div>

                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Details</h6>
                            <ul class="list-unstyled mb-0">
                                <li class="mb-1">
                                    <small class="text-muted">Published:</small>
                                    {{ $entry->created_at->format('M j, Y') }}
                                </li>
                                @if($entry->updated_at->gt($entry->created_at))
                                    <li class="mb-1">
                                        <small class="text-muted">Updated:</small>
                                        {{ $entry->updated_at->format('M j, Y') }}
                                    </li>
                                @endif
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
@stack('modals')
{!! App\View\Helpers\LayoutSection::footer(null) !!}
