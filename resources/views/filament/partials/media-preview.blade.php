@php
    // $getRecord() is the current Media model
    $media = $getRecord();
@endphp

@if ($media)
    <div style="text-align:center;margin-bottom:1rem;">
        <img
            src="{{ $media->getMediaUrl() }}"
            alt="{{ $media->getCustomProperty('image_alt_text') }}"
            style="max-width: 100%; height: auto; border: 1px solid #ddd; padding: 4px;"
        />
    </div>
@endif
