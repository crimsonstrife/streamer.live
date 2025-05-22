<?php

namespace App\Models;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use InvalidArgumentException;
use Spatie\LaravelSettings\Events\LoadingSettings;
use Spatie\LaravelSettings\Exceptions\MissingSettings;
use Spatie\LaravelSettings\SettingsConfig;
use Spatie\LaravelSettings\SettingsMapper as SpatieSettingsMapper;
use Spatie\LaravelSettings\Support\Crypto;

class SettingsMapper extends SpatieSettingsMapper
{
    /** @var array<string, SettingsConfig> */
    private array $configs = [];

    /**
     * @throws MissingSettings
     */
    public function load(string $settingsClass): Collection
    {
        $config = $this->getConfig($settingsClass);

        // Attempt to fetch properties; if the repository is empty, initialize defaults.
        $properties = $this->fetchProperties(
            $settingsClass,
            $config->getReflectedProperties()->keys()
        );

        // Dynamically fill missing settings with default values.
        $properties = $this->fillMissingSettingsWithDefaultValues($config, $properties);

        // Modify behavior during migrations and non-production environments.
        if ($this->shouldEnforceMissingSettingsCheck()) {
            $this->ensureNoMissingSettings($config, $properties, 'loading');
        } else {
            $this->logMissingSettingsWarning($config, $properties);
        }

        event(new LoadingSettings($settingsClass, $properties));

        return $properties;
    }

    private function getConfig(string $settingsClass): SettingsConfig
    {
        if (! $this->has($settingsClass)) {
            $this->initialize($settingsClass);

            // Ensure the configuration is now present.
            if (! $this->has($settingsClass)) {
                logger()->warning("Settings class '{$settingsClass}' could not be initialized in SettingsMapper.");
                throw new InvalidArgumentException("Settings class '{$settingsClass}' is not properly configured.");
            }
        }

        return $this->configs[$settingsClass];
    }

    public function has(string $settingsClass): bool
    {
        return array_key_exists($settingsClass, $this->configs);
    }

    public function initialize(string $settingsClass): SettingsConfig
    {
        if (isset($this->configs[$settingsClass])) {
            return $this->configs[$settingsClass];
        }

        $settingsConfig = parent::initialize($settingsClass);

        // Add the settings config to the configs array.
        $this->configs[$settingsClass] = $settingsConfig;

        return $settingsConfig;
    }

    public function fetchProperties(string $settingsClass, Collection $names): Collection
    {
        // 1) If the settings table isn't there yet, bail out immediately.
        if (! Schema::hasTable('settings')) {
            return collect();
        }

        // 2) Now that we know the table exists, go ahead and load from the repo.
        $config = $this->getConfig($settingsClass);

        $raw = $config
            ->getRepository()
            ->getPropertiesInGroup($config->getGroup());

        return collect($raw)
            ->filter(fn($payload, string $name) => $names->contains($name))
            ->map(function ($payload, string $name) use ($config) {
                if ($config->isEncrypted($name)) {
                    $payload = Crypto::decrypt($payload);
                }

                if ($cast = $config->getCast($name)) {
                    $payload = $cast->get($payload);
                }

                return $payload;
            });
    }


    private function fillMissingSettingsWithDefaultValues(SettingsConfig $config, Collection $properties): Collection
    {
        $missingSettings = $config->getReflectedProperties()->keys()->diff($properties->keys());

        foreach ($missingSettings as $missingSetting) {
            $reflectionProperty = $config->getReflectedProperties()[$missingSetting];

            // Handle missing boolean properties.
            if ($reflectionProperty->getType() && $reflectionProperty->getType()->getName() === 'bool') {
                $properties->put($missingSetting, false);
                // Handle missing integer properties.
            } elseif ($reflectionProperty->getType() && $reflectionProperty->getType()->getName() === 'int') {
                $properties->put($missingSetting, 0);
                // Handle missing string properties.
            } elseif ($reflectionProperty->getType() && $reflectionProperty->getType()->getName() === 'string') {
                $properties->put($missingSetting, '');
            } elseif ($reflectionProperty->hasDefaultValue()) {
                // Use the default value if defined.
                $properties->put($missingSetting, $reflectionProperty->getDefaultValue());
            } elseif ($reflectionProperty->getType()->allowsNull()) {
                // Use null if allowed by the type.
                $properties->put($missingSetting, null);
            } else {
                // Assign a sensible fallback for other types (optional).
                $properties->put($missingSetting, null);
            }
        }

        return $properties;
    }

    private function shouldEnforceMissingSettingsCheck(): bool
    {
        return app()->environment('production') && ! app()->runningInConsole();
    }

    /**
     * @throws MissingSettings
     */
    private function ensureNoMissingSettings(
        SettingsConfig $config,
        Collection $properties,
        string $operation
    ): void {
        $missingSettings = $config
            ->getReflectedProperties()
            ->filter(function ($reflectionProperty, $name) use ($properties) {
                return ! $properties->has($name) &&
                    (! $reflectionProperty->hasDefaultValue() && ! $reflectionProperty->getType()->allowsNull());
            })
            ->keys()
            ->toArray();

        if (! empty($missingSettings)) {
            throw MissingSettings::create($config->getName(), $missingSettings, $operation);
        }
    }

    private function logMissingSettingsWarning(SettingsConfig $config, Collection $properties): void
    {
        $missingSettings = $config
            ->getReflectedProperties()
            ->keys()
            ->diff($properties->keys())
            ->toArray();

        if (! empty($missingSettings)) {
            logger()->warning("Missing settings detected for '{$config->getName()}': ".implode(', ', $missingSettings));
        }
    }

    /**
     * @throws MissingSettings
     */
    public function save(
        string $settingsClass,
        Collection $properties
    ): Collection {
        $config = $this->getConfig($settingsClass);

        $this->ensureNoMissingSettings($config, $properties, 'saving');

        $notRejectedProperties = $properties
            ->reject(fn ($payload, string $name) => $config->isLocked($name));

        $changedProperties = $notRejectedProperties
            ->map(function ($payload, string $name) use ($config) {
                if ($cast = $config->getCast($name)) {
                    $payload = $cast->set($payload);
                }

                if ($config->isEncrypted($name)) {
                    $payload = Crypto::encrypt($payload);
                }

                return $payload;
            })
            ->toArray();

        $config->getRepository()->updatePropertiesPayload(
            $config->getGroup(),
            $changedProperties
        );

        return $this
            ->fetchProperties($settingsClass, $config->getLocked())
            ->merge($notRejectedProperties);
    }
}
