import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'resources/css/app.css',
        'resources/css/colors.css',
        'resources/css/filament/admin/theme.css',
        'resources/js/app.js',
        'tailwind.config.js'
      ],
      refresh: true
    }),
    tailwindcss('tailwind.config.js')
  ]
})
