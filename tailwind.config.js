import 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import preset from './vendor/filament/filament/tailwind.config.preset.js'
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  presets: [preset],
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './vendor/awcodes/filament-tiptap-editor/resources/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
    './resources/**/*.php',
    './app/Filament/**/*.php',
    './resources/views/filament/**/*.blade.php',
    './vendor/filament/**/*.blade.php'
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        // Accent variables are defined in resources/css/app.css...
        accent: {
          DEFAULT: 'var(--color-accent)',
          content: 'var(--color-accent-content)',
          foreground: 'var(--color-accent-foreground)'
        }
      },
      backgroundOpacity: {
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
        50: '0.5', // Ensure bg-opacity-50 is available
        60: '0.6',
        70: '0.7',
        80: '0.8',
        90: '0.9'
      }
    }
  },

  corePlugins: {
    preflight: false // Disable Tailwind's reset to avoid conflicts with Bootstrap
  },

  plugins: [forms, typography]
}
