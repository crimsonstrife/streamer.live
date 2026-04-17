@props(['contentType', 'entries', 'fields'])

@if($contentType && $entries->isNotEmpty())
    <section class="content-type-list py-4">
        <h2 class="mb-4">{{ $contentType->name }}</h2>

        <div class="row g-4">
            @foreach($entries as $entry)
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                @if($contentType->route_prefix)
                                    <a href="{{ route("content-type.{$contentType->slug}.show", $entry->slug) }}"
                                       class="text-decoration-none">
                                        {{ $entry->title }}
                                    </a>
                                @else
                                    {{ $entry->title }}
                                @endif
                            </h5>

                            @foreach($fields->where('show_in_table', true)->take(3) as $field)
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

        @if($contentType->route_prefix)
            <div class="text-center mt-4">
                <a href="{{ route("content-type.{$contentType->slug}.index") }}" class="btn btn-outline-primary">
                    View All {{ $contentType->name }}
                </a>
            </div>
        @endif
    </section>
@endif
