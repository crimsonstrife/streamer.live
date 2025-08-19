<?php

namespace App\Models;

use Exception;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
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

        $properties = $this->fetchProperties(
            $settingsClass,
            $config->getReflectedProperties()->keys()
        );

        $properties = $this->fillMissingSettingsWithDefaultValues($config, $properties);

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

            if (! $this->has($settingsClass)) {
                Log::warning("Settings class '{$settingsClass}' could not be initialized in SettingsMapper.");
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

        $this->configs[$settingsClass] = $settingsConfig;

        return $settingsConfig;
    }

    public function fetchProperties(string $settingsClass, Collection $names): Collection
    {
        // If the settings table isn't there yet, bail out immediately.
        try {
            if (! Schema::hasTable('settings')) {
                return collect();
            }
        } catch (Exception $e) {
            Log::warning($e->getMessage());
            return collect();
        }

        $config = $this->getConfig($settingsClass);

        $raw = $config
            ->getRepository()
            ->getPropertiesInGroup($config->getGroup());

        $canDecrypt = (bool) config('app.key');

        return collect($raw)
            ->filter(fn ($payload, string $name) => $names->contains($name))
            ->map(function ($payload, string $name) use ($config, $canDecrypt) {
                if ($config->isEncrypted($name) && $canDecrypt && $payload !== null && $payload !== '') {
                    try {
                        $payload = Crypto::decrypt($payload);
                    } catch (DecryptException $e) {
                        Log::warning("Settings decrypt failed for {$config->getGroup()}.{$name}: {$e->getMessage()}");
                        $payload = null; // let defaults/backfill handle it
                    }
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

            if ($reflectionProperty->getType() && $reflectionProperty->getType()->getName() === 'bool') {
                $properties->put($missingSetting, false);
            } elseif ($reflectionProperty->getType() && $reflectionProperty->getType()->getName() === 'int') {
                $properties->put($missingSetting, 0);
            } elseif ($reflectionProperty->getType() && $reflectionProperty->getType()->getName() === 'string') {
                $properties->put($missingSetting, '');
            } elseif ($reflectionProperty->hasDefaultValue()) {
                $properties->put($missingSetting, $reflectionProperty->getDefaultValue());
            } elseif ($reflectionProperty->getType() && $reflectionProperty->getType()->allowsNull()) {
                $properties->put($missingSetting, null);
            } else {
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
                return ! $properties->has($name)
                    && (! $reflectionProperty->hasDefaultValue()
                        && $reflectionProperty->getType()
                        && ! $reflectionProperty->getType()->allowsNull());
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
            Log::warning("Missing settings detected for '{$config->getName()}': " . implode(', ', $missingSettings));
        }
    }

    /**
     * @throws MissingSettings
     */
    public function save(string $settingsClass, Collection $properties): Collection
    {
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
