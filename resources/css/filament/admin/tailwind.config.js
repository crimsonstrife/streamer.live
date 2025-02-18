import 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import preset from './vendor/filament/filament/tailwind.config.preset.js'
const colors = require('tailwindcss/colors')

export default {
  presets: [preset],
  content: [
    './app/Filament/**/*.php',
    './resources/views/filament/**/*.blade.php',
    './vendor/filament/**/*.blade.php'
  ],
  prefix: 'tw-', // Prefix all Tailwind classes with 'tw-' to avoid conflicts with Bootstrap
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
      },
      borderRadius: {
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem'
      }
    }
  },

  corePlugins: {
    preflight: false // Disable Tailwind's reset to avoid conflicts with Bootstrap
  },

  plugins: [forms, typography]
}
