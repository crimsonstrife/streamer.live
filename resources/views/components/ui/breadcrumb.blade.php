@props(['items' => []])

<nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-transparent p-0 mb-3">
        @foreach ($items as $label => $url)
            @if (!$loop->last)
                <li class="breadcrumb-item">
                    <a href="{{ $url }}" class="text-decoration-none text-primary">{{ $label }}</a>
                </li>
            @else
                <li class="breadcrumb-item active text-dark" aria-current="page">{{ $label }}</li>
            @endif
        @endforeach
    </ol>
</nav>
<style>
    .breadcrumb {
        --bs-breadcrumb-divider: '>';
    }
</style>
