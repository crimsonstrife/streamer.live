<div>
    <textarea id="{{ $id ?? 'content-editor' }}" name="{{ $name ?? 'content' }}" class="form-textarea">{{ $value ?? '' }}</textarea>
</div>

<script defer>
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize TinyMCE
        tinymce.init({
            selector: '#{{ $id ?? 'content-editor' }}',
            license_key: 'gpl',
            plugins: 'link image code lists mention media wordcount preview emoticons codesample',
            toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image | code',
            menubar: true,
            promotion: false,
            height: '400px',
            width: '100%',
            mentions: {
                source: async (query, success) => {
                    console.log('Mention query:', query);

                    try {
                        const response = await fetch(`/api/users/search?query=${query}`);
                        const users = await response.json();

                        success(users.map(user => ({
                            id: user.id,
                            name: user.username,
                            displayName: user.username,
                        })));
                    } catch (error) {
                        console.error('Error fetching mentions:', error);
                        success([]);
                    }
                },
                insert: (item) => `@${item.name}`, // Customize the format of inserted mentions
                delay: 300, // Delay before fetching results
                minChars: 1, // Minimum characters before search triggers
            },
            content_style: `
            body {
                line-height: 1.6;
            }
        `
        });
    });
</script>
