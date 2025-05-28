@aware(['page'])
@php
    $uid       = 'faq-' . uniqid();
    $expandedAll = $expanded_by_default ?? false;
@endphp

<div class="faq-block">
    @if(!empty($title))
        <h2>{{ $title }}</h2>
    @endif

    <div class="accordion" id="{{ $uid }}">
        @foreach($items as $i => $item)
            <details id="{{ $uid }}-item-{{ $i }}" {{ $expandedAll ? 'open' : '' }} class="mb-3">
                <summary class="fw-semibold" style="cursor: pointer;">
                    {{ $item['question'] }}
                </summary>
                <div class="mt-2">
                    {!! $item['answer'] !!}
                </div>
            </details>
        @endforeach
    </div>

</div>
