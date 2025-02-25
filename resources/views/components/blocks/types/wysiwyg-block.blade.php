<div>
    @if ($isPreview)
        <div class="p-3 border rounded bg-light">
            {!! $block['content']['html'] ?? '<em>No content yet...</em>' !!}
        </div>
    @else
        <textarea id="wysiwyg-editor-{{ $index }}"
                  wire:model.defer="blocks.{{ $index }}.content.html"
                  placeholder="Enter rich text content...">
            {{ $block['content']['html'] ?? '' }}
        </textarea>
    @endif
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        Livewire.hook('message.processed', () => {
            initTinyMCE("wysiwyg-editor-{{ $index }}");
        });

        initTinyMCE("wysiwyg-editor-{{ $index }}");
    });

    function initTinyMCE(editorId) {
        if (tinymce.get(editorId)) {
            tinymce.get(editorId).remove();
        }

        tinymce.init({
            selector: "#" + editorId,
            plugins: "link image code lists",
            toolbar: "undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
            menubar: false,
            license_key: "gpl",
            setup: function (editor) {
                editor.on("change", function () {
                    Livewire.dispatch('updateWysiwygContent', {
                        id: editorId,
                        content: editor.getContent()
                    });
                });
            }
        });
    }
</script>
