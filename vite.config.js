import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    define: {
        "window.jQuery": "jQuery",
        "window.$": "jQuery",
    },
    optimizeDeps: {
        include: ["jquery"],
    },
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/css/admin.css",
                "resources/js/admin.js",
                "resources/css/store.css",
                "resources/js/store.js",
                "resources/css/blog.css",
                "resources/css/filament/admin/theme.css",
                "resources/css/filament/moderation/theme.css",
            ],
            refresh: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: "node_modules/jquery/dist/*",
                    dest: "vendors/jquery",
                },
                {
                    src: "node_modules/sceditor/minified/sceditor.min.js",
                    dest: "vendors/sceditor",
                },
                {
                    src: "node_modules/sceditor/minified/formats/bbcode.js",
                    dest: "vendors/sceditor/formats",
                },
                {
                    // SVG icon set (monocons). Swaps out the famfamfam.png
                    // sprite for inline SVGs with `fill:currentColor`, so
                    // icons inherit the dark theme's colors cleanly.
                    src: "node_modules/sceditor/minified/icons/monocons.js",
                    dest: "vendors/sceditor/icons",
                },
                {
                    src: "node_modules/sceditor/minified/themes/defaultdark.min.css",
                    dest: "vendors/sceditor/themes",
                },
                {
                    // Icon sprite referenced by the theme CSS via url(famfamfam.png).
                    // Without this, toolbar buttons render with no glyph.
                    src: "node_modules/sceditor/minified/themes/famfamfam.png",
                    dest: "vendors/sceditor/themes",
                },
                {
                    src: "node_modules/sceditor/minified/themes/content/*",
                    dest: "vendors/sceditor/themes/content",
                },
                {
                    // Custom dark-theme content CSS for the editor iframe.
                    src: "resources/sceditor/content-dark.css",
                    dest: "vendors/sceditor/themes/content",
                },
                {
                    src: "resources/icons/",
                    // this will drop into public/build/assets/icons/
                    dest: "assets/",
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            tinymce: "/node_modules/tinymce",
        },
    },
});
