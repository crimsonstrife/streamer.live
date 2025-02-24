<div>
    @if ($isPreview)
        <div class="p-3 border rounded bg-light">
            {!! $block['content']['html'] ?? '<em>No content yet...</em>' !!}
        </div>
    @else
        <textarea id="wysiwyg-editor-{{ $index }}" wire:model.defer="blocks.{{ $index }}.content.html"></textarea>

        <script>
            document.addEventListener("DOMContentLoaded", function() {
                initTinyMCE("wysiwyg-editor-{{ $index }}");
            });

            document.addEventListener("livewire:load", function() {
                initTinyMCE("wysiwyg-editor-{{ $index }}");
            });

            document.addEventListener("livewire:update", function() {
                setTimeout(() => initTinyMCE("wysiwyg-editor-{{ $index }}"), 500);
            });

            function initTinyMCE(editorId) {
                if (tinymce.get(editorId)) {
                    tinymce.get(editorId).remove();
                }

                tinymce.init({
                    selector: "#" + editorId,
                    plugins: "link image code lists",
                    toolbar: "undo redo | styles | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | code",
                    menubar: false,
                    license_key: "gpl",
                    setup: function(editor) {
                        editor.on("change", function () {
                            Livewire.emit('updateWysiwygContent', editorId, editor.getContent());
                        });
                    }
                });
            }
        </script>
    @endif
</div>