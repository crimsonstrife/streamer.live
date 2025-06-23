@php
    // $getRecord() is the current Media model
    $media = $getRecord();
@endphp

@if ($media)
    <div style="text-align:center;margin-bottom:1rem;">
        <img
            src="{{ $media->getFullUrl() }}"
            alt="{{ $media->file_name }}"
            style="max-width: 100%; height: auto; border: 1px solid #ddd; padding: 4px;"
        />
    </div>
@endif
