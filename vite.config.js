import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  define: {
    'window.jQuery': 'jQuery',
    'window.$': 'jQuery'
  },
  optimizeDeps: {
    include: ['jquery']
  },
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.js',
        'resources/css/admin.css',
        'resources/js/admin.js',
        'resources/css/store.css',
        'resources/js/store.js',
        'resources/css/blog.css',
        'resources/css/filament/admin/theme.css',
        'resources/css/filament/moderation/theme.css'
      ],
      refresh: true
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@redmine-ui/tributejs/dist/*',
          dest: 'vendors/tributejs'
        },
        {
          src: 'node_modules/jquery/dist/*',
          dest: 'vendors/jquery'
        },
        {
          src: 'resources/js/tinymce-tribute.js',
          dest: 'js'
        },
        {
          src: 'resources/icons/',
          // this will drop into public/build/assets/icons/
          dest: 'assets/'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      tribute: '/node_modules/@redmine-ui/tributejs',
      tinymce: '/node_modules/tinymce'
    }
  }
})
