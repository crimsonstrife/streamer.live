@php
    $id         = $getId();
    $statePath  = $getStatePath();
    $maxLength  = $getMaxLength();
    $buttons    = implode(' ', $getToolbarButtons());
    $extraAttrs      = $getExtraAttributes();
    $disableGrammarly= $extraAttrs['grammDisabled'] ?? false;
    $mentions        = $extraAttrs['mentions']      ?? false;
@endphp
@php
    $rawPlaceholder = $getPlaceholder();
    $placeholder = $rawPlaceholder instanceof \Closure
        ? $rawPlaceholder()
        : $rawPlaceholder;
@endphp
<div wire:ignore>
    <textarea
        id="{{ $id }}"
        placeholder="{{ $placeholder }}"
        {{ $isDisabled() ? 'disabled' : '' }}
        {{ $disableGrammarly ? 'data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"' : '' }}
        class="w-full min-h-[200px] rounded border px-3 py-2"
    >{{ $getState() }}</textarea>
</div>

@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            tinymce.init({
                selector: '#{{ $id }}',
                license_key: 'gpl',
                plugins: [
                    'link image code lists media preview codesample',
                    {{ $maxLength ? "'wordcount'," : '' }}
                    @if ($mentions)
                        'mention',
                    @endif
                ].join(' '),
                toolbar: '{{ $buttons }}',
                menubar: true,
                promotion: false,
                height: 400,
                width: '100%',

                // enforce max-length if provided
                setup(editor) {
                    @if ($maxLength)
                    editor.on('BeforeInput', e => {
                        const text = editor.getContent({ format: 'text' });
                        if (text.length >= {{ $maxLength }} && ! ['Backspace','Delete'].includes(e.inputType)) {
                            e.preventDefault();
                        }
                    });
                    @endif

                    // live-sync back to Livewire state:
                    editor.on('Change KeyUp', () => {
                        @this.set('{{ $statePath }}', editor.getContent());
                    });

                    // file-attachment picker
                    editor.settings.file_picker_callback = (callback, value, meta) => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.onchange = () => {
                            const file = input.files[0];
                            @this.upload(`componentFileAttachments.{{ $statePath }}`, file, () => {
                                @this.getFormComponentFileAttachmentUrl('{{ $statePath }}')
                                    .then(url => callback(url, { text: file.name }));
                            });
                        };
                        input.click();
                    };
                },

                @if ($mentions)
                // your mention config…
                mentions_selector: '{{ $id }}',
                mentions_fetch: async (query, success) => {
                    const res = await fetch(`/api/users/search?query=${encodeURIComponent(query)}`);
                    success(await res.json());
                },
                mentions_insert: item => `@${item.name}`,
                @endif

                content_style: 'body { line-height: 1.6; }',
            });
        });
    </script>
@endpush
