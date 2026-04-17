@props(['field', 'value', 'summary' => false])

@php
    $type = $field->type;
@endphp

<div class="content-field content-field--{{ $type }} mb-3">
    @if(!$summary)
        <label class="form-label fw-semibold text-muted small">{{ $field->label }}</label>
    @endif

    @switch($type)
        @case('richtext')
            @if($summary)
                <p class="card-text text-muted small">{!! Str::limit(strip_tags($value), 120) !!}</p>
            @else
                <div class="content-richtext">{!! $value !!}</div>
            @endif
            @break

        @case('textarea')
            @if($summary)
                <p class="card-text text-muted small">{{ Str::limit($value, 120) }}</p>
            @else
                <p style="white-space: pre-wrap;">{{ $value }}</p>
            @endif
            @break

        @case('image')
            @if(is_array($value))
                <div class="d-flex flex-wrap gap-2">
                    @foreach($value as $img)
                        <img src="{{ Storage::url($img) }}" alt="{{ $field->label }}" class="img-fluid rounded" style="max-height: 300px;">
                    @endforeach
                </div>
            @elseif($value)
                <img src="{{ Storage::url($value) }}" alt="{{ $field->label }}" class="img-fluid rounded" style="max-height: 400px;">
            @endif
            @break

        @case('file')
            @if(is_array($value))
                <ul class="list-unstyled">
                    @foreach($value as $file)
                        <li><a href="{{ Storage::url($file) }}" target="_blank">{{ basename($file) }}</a></li>
                    @endforeach
                </ul>
            @elseif($value)
                <a href="{{ Storage::url($value) }}" target="_blank">{{ basename($value) }}</a>
            @endif
            @break

        @case('toggle')
            <span class="badge {{ $value ? 'bg-success' : 'bg-secondary' }}">
                {{ $value ? 'Yes' : 'No' }}
            </span>
            @break

        @case('color')
            <span class="d-inline-flex align-items-center gap-2">
                <span class="rounded-circle d-inline-block" style="width: 20px; height: 20px; background-color: {{ $value }};"></span>
                <code>{{ $value }}</code>
            </span>
            @break

        @case('url')
            <a href="{{ $value }}" target="_blank" rel="noopener">{{ $value }}</a>
            @break

        @case('email')
            <a href="mailto:{{ $value }}">{{ $value }}</a>
            @break

        @case('date')
            <p>{{ \Carbon\Carbon::parse($value)->format('F j, Y') }}</p>
            @break

        @case('datetime')
            <p>{{ \Carbon\Carbon::parse($value)->format('F j, Y g:i A') }}</p>
            @break

        @case('select')
            @if(is_array($value))
                @foreach($value as $v)
                    <span class="badge bg-primary me-1">{{ $v }}</span>
                @endforeach
            @else
                <span class="badge bg-primary">{{ $value }}</span>
            @endif
            @break

        @case('repeater')
            @if(is_array($value) && !$summary)
                @foreach($value as $item)
                    <div class="card mb-2">
                        <div class="card-body py-2 px-3">
                            @foreach($item as $key => $val)
                                @if(!is_array($val))
                                    <span class="me-3"><strong>{{ ucfirst(str_replace('_', ' ', $key)) }}:</strong> {{ $val }}</span>
                                @endif
                            @endforeach
                        </div>
                    </div>
                @endforeach
            @endif
            @break

        @default
            @if($summary)
                <p class="card-text text-muted small">{{ Str::limit($value, 100) }}</p>
            @else
                <p>{{ $value }}</p>
            @endif
    @endswitch
</div>
