@php
    $id                = $getId();
    $statePath         = $getStatePath();
    $buttons           = implode(' ', $getToolbarButtons());
    $maxLength         = $getMaxLength();
    $rawPlaceholder    = $getPlaceholder();
    $placeholder       = $rawPlaceholder instanceof \Closure
                          ? $rawPlaceholder()
                          : $rawPlaceholder;
    $extraAttrs        = $getExtraAttributes();
    $disableGrammarly  = $extraAttrs['grammDisabled'] ?? false;
    $mentions          = $extraAttrs['mentions']      ?? false;
@endphp

<div wire:ignore>
    <textarea
        id="{{ $id }}"
        name="{{ $getName() }}"
        placeholder="{{ $placeholder }}"
        {{ $isDisabled() ? 'disabled' : '' }}
        {{ $disableGrammarly ? 'data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"' : '' }}
        class="w-full min-h-[200px] rounded border px-3 py-2"
    >{{ $getState() }}</textarea>
</div>

@push('scripts')
    <script>
        (function(){
            // grab values into JS variables
            var id        = @json($id);
            var statePath = @json($statePath);

            function initEditor() {
                if (typeof tinymce === 'undefined' || tinymce.get(id)) {
                    return;
                }

                tinymce.init({
                    selector: '#' + id,
                    license_key: 'gpl',
                    plugins: [
                        'link image code lists media preview codesample',
                        {{ $maxLength ? "'wordcount'," : '' }}
                            @if ($mentions)
                        'mention',
                        @endif
                    ].join(' '),
                    toolbar: @json($buttons),
                    menubar: true,
                    promotion: false,
                    height: 400,
                    width: '100%',

                    // file picker goes top-level
                    file_picker_callback: function(callback, value, meta) {
                        var input = document.createElement('input');
                        input.type = 'file';
                        input.onchange = function() {
                            var file = input.files[0];
                            @this.upload(`componentFileAttachments.${statePath}`, file, function() {
                                @this.getFormComponentFileAttachmentUrl(statePath)
                                    .then(function(url) {
                                        callback(url, { text: file.name });
                                    });
                            });
                        };
                        input.click();
                    },

                    setup: function(editor) {
                        @if ($maxLength)
                        editor.on('BeforeInput', function(e) {
                            var text = editor.getContent({ format: 'text' });
                            if (text.length >= {{ $maxLength }} && ['Backspace','Delete'].indexOf(e.inputType) === -1) {
                                e.preventDefault();
                            }
                        });
                        @endif

                        editor.on('Change KeyUp', function() {
                            @this.set(statePath, editor.getContent());
                        });
                    },

                    @if ($mentions)
                    // @-mention support
                    mentions_selector: '#' + id,
                    mentions_fetch: async function(query, success) {
                        var res = await fetch('/api/users/search?query=' + encodeURIComponent(query));
                        success(await res.json());
                    },
                    mentions_insert: function(item) {
                        return '@' + item.name;
                    },
                    @endif

                    content_style: 'body { line-height: 1.6; }',
                });
            }

            // init on page & SPA navigations
            document.addEventListener('DOMContentLoaded', initEditor);
            document.addEventListener('livewire:load',      initEditor);
            document.addEventListener('turbo:load',         initEditor);
        })();
    </script>
@endpush
