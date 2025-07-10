<div>
    <textarea id="{{ $id }}" name="{{ $name }}" {{ $attributes->merge(['class' => 'form-textarea']) }}>{{ $value }}</textarea>
</div>

<script defer>
    document.addEventListener('DOMContentLoaded', function() {
        // No need to load all emotes up‐front now
        tinymce.init({
            selector: '#{{ $id ?? 'content-editor' }}',
            license_key: 'gpl',
            plugins: [
                'link','image','code','lists',
                @if($mentions) 'mention', @endif
                    'media','wordcount','preview','codesample'
            ].join(' '),
            toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image emoticons | code',
            menubar: true,
            promotion: false,
            height: 400,
            width: '100%',

            @if($mentions)
            // — USER “@” MENTIONS (unchanged) —
            mentions: {
                source: async (query, success) => {
                    try {
                        const res   = await fetch(`/api/users/search?query=${encodeURIComponent(query)}`);
                        const users = await res.json();
                        success(users.map(u => ({
                            id:   u.id,
                            name: u.username,
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

            // — EMOTE “:” PICKER via dynamic API —
            setup(editor) {
                editor.ui.registry.addAutocompleter('emote-autocomplete', {
                    trigger: ':',          // fires when you type “:”
                    minChars: 1,
                    columns: 4,            // grid of icons
                    fetch: async (pattern) => {
                        try {
                            const res = await fetch(`/api/emotes?query=${encodeURIComponent(pattern)}`);
                            const list = await res.ok ? await res.json() : [];
                            return list.map(e => ({
                                value: e.url,             // passed into onAction
                                text:  `:${e.code}:`,     // label in the dropdown
                                icon:  `<img src="${e.url}" style="width:1em;height:1em"/>`
                            }));
                        } catch {
                            return [];
                        }
                    },
                    onAction: (autocompleterApi, range, imageUrl) => {
                        editor.selection.setRng(range);
                        editor.insertContent(
                            `<img src="${imageUrl}" alt="" style="width:1em;height:1em;vertical-align:middle"/>`
                        );
                        autocompleterApi.hide();
                    }
                });
            },

            content_style: `
      body { line-height: 1.6; }
    `
        });
    });
</script>
