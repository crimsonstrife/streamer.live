@php
    // Pull in all your emotes and shape them into the TinyMCE format
    $customEmotes = \App\Models\Emote::all()->mapWithKeys(function($e) {
        return [
            $e->code => [
                'url'      => Storage::url($e->image_path),
                'char'     => '',
                'keywords' => $e->keywords, // array or comma-string
            ],
        ];
    });
@endphp

<div>
    <textarea id="{{ $id }}" name="{{ $name }}" {{ $attributes->merge(['class' => 'form-textarea']) }}>{{ $value }}</textarea>
</div>

<script defer>
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize TinyMCE
        tinymce.init({
            selector: '#{{ $id ?? 'content-editor' }}',
            license_key: 'gpl',
            plugins: [
                'link', 'image', 'code', 'lists',
                @if($mentions)
                    'mention',
                @endif
                    'media', 'wordcount', 'preview', 'emoticons', 'codesample'
            ].join(' '),
            toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image emoticons | code',
            menubar: true,
            promotion: false,
            height: '400px',
            width: '100%',
            @if($mentions)
            mentions: {
                source: async (query, success) => {
                    try {
                        const res   = await fetch(`/api/users/search?query=${query}`);
                        const users = await res.json();
                        success(users.map(u => ({
                            id: u.id,
                            name: u.username,
                            displayName: u.username,
                        })));
                    } catch {
                        success([]);
                    }
                },
                insert: item => `@${item.name}`,
                delay: 300,
                minChars: 1,
            },
            @endif
            emoticons_append: @json($customEmotes),
            content_style: `
            body {
                line-height: 1.6;
            }
        `
        });
    });
</script>
