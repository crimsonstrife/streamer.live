import preset from '../../../../vendor/filament/filament/tailwind.config.preset'

export default {
  presets: [preset],
  content: [
    './app/Filament/Moderation/**/*.php',
    './resources/views/filament/moderation/**/*.blade.php',
    './vendor/filament/**/*.blade.php',
    './vendor/guava/calendar/resources/**/*.blade.php',
    './vendor/guava/tutorials/resources/**/*.php'
  ]
}
