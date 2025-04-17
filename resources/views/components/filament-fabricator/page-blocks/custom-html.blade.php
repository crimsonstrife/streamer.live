@aware(['page','html' => '', 'use_container' => false, 'background' => 'none', 'padding' => 'py-0'])

@if (! empty($html))
    <section class="{{ $background !== 'none' ? $background : '' }} {{ $padding }}">
        @if ($use_container)
            <div class="container">
                {!! $html !!}
            </div>
        @else
            {!! $html !!}
        @endif
    </section>
@endif
