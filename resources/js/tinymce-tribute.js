document.addEventListener("DOMContentLoaded", function () {
    // Initialize Tribute.js
    const tribute = new Tribute({
        trigger: "@",
        values: async (text, cb) => {
            try {
                const response = await fetch(`/api/users/search?query=${text}`);
                const users = await response.json();
                cb(
                    users.map((user) => ({
                        key: user.username,
                        value: `@${user.username}`,
                    })),
                );
            } catch (error) {
                console.error("Error fetching user mentions:", error);
                cb([]);
            }
        },
        menuItemTemplate: (item) => {
            return `<strong>@${item.original.key}</strong> <small>${item.original.name}</small>`;
        },
        selectTemplate: (item) => {
            return `@${item.original.key}`;
        },
    });

    // Initialize TinyMCE
    tinymce.init({
        selector: '#{{ $id ?? "content-editor" }}',
        license_key: "gpl",
        plugins: "link image code lists",
        toolbar:
            "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image | code",
        menubar: true,
        promotion: false,
        height: "600px",
        width: "100%",
        content_style: `
            body {
                line-height: 1.6;
            }
        `,
    });
});
