@props([
    'left'  => [],
    'right' => [],
    'full_width' => false,
])

{{-- if you still want the outer container: --}}
<div class="{{ $full_width ? '' : 'container' }} py-6">
    <div class="row gx-5 gy-4">
        <div id="left-column" class="col-12 col-md-6">
            <x-filament-fabricator::page-blocks :blocks="$left" />
        </div>
        <div id="right-column" class="col-12 col-md-6">
            <x-filament-fabricator::page-blocks :blocks="$right" />
        </div>
    </div>
</div>
