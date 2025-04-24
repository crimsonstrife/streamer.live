<?php

namespace App\Models;

use Exception;
use Illuminate\Container\Container;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use JsonException;
use ReflectionProperty;
use Spatie\LaravelSettings\Events\SavingSettings;
use Spatie\LaravelSettings\Events\SettingsLoaded;
use Spatie\LaravelSettings\Events\SettingsSaved;
use Spatie\LaravelSettings\Exceptions\MissingSettings;
use Spatie\LaravelSettings\Settings as SpatieSettings;
use Spatie\LaravelSettings\SettingsConfig;
use Spatie\LaravelSettings\SettingsRepositories\SettingsRepository;
use Spatie\LaravelSettings\Support\Crypto;
use Symfony\Component\HttpFoundation\Response;

abstract class Settings extends SpatieSettings
{
    protected ?Collection $originalValues = null;

    private SettingsMapper $mapper;

    private SettingsConfig $config;

    private bool $loaded = false;

    private bool $configInitialized = false;

    abstract public static function group(): string;

    /**
     * @return static
     *
     * @throws MissingSettings
     */
    public static function fake(array $values, bool $loadMissingValues = true): self
    {
        $settingsMapper = app(SettingsMapper::class);

        $propertiesToLoad = $settingsMapper->initialize(static::class)
            ->getReflectedProperties()
            ->keys()
            ->reject(fn (string $name) => array_key_exists($name, $values));

        if ($propertiesToLoad->isEmpty()) {
            return app(Container::class)->instance(static::class, new static(
                $values
            ));
        }

        if ($propertiesToLoad->isNotEmpty() && $loadMissingValues === false) {
            throw MissingSettings::create(static::class, $propertiesToLoad->toArray(), 'loading fake');
        }

        $mergedValues = $settingsMapper
            ->fetchProperties(static::class, $propertiesToLoad)
            ->merge($values)
            ->all();

        return app(Container::class)->instance(static::class, new static(
            $mergedValues
        ));
    }

    public function __debugInfo(): array
    {
        try {
            $this->loadValues();

            return $this->toArray();
        } catch (Exception $exception) {
            return [
                'Could not load values',
            ];
        }
    }

    public function __isset($name)
    {
        $this->loadValues();

        return isset($this->{$name});
    }

    public function __serialize(): array
    {
        /** @var Collection $encrypted */
        /** @var Collection $nonEncrypted */
        [$encrypted, $nonEncrypted] = $this->toCollection()->partition(
            fn ($value, string $name) => $this->config->isEncrypted($name)
        );

        return array_merge(
            $encrypted->map(fn ($value) => Crypto::encrypt($value))->all(),
            $nonEncrypted->all()
        );
    }

    public function toCollection(): Collection
    {
        $this->ensureConfigIsLoaded();

        return $this->config
            ->getReflectedProperties()
            ->mapWithKeys(fn (ReflectionProperty $property) => [
                $property->getName() => $this->{$property->getName()},
            ]);
    }

    public function __unserialize(array $data): void
    {
        $this->loaded = false;

        $this->ensureConfigIsLoaded();

        /** @var Collection $encrypted */
        /** @var Collection $nonEncrypted */
        [$encrypted, $nonEncrypted] = collect($data)->partition(
            fn ($value, string $name) => $this->config->isEncrypted($name)
        );

        $data = array_merge(
            $encrypted->map(fn ($value) => Crypto::decrypt($value))->all(),
            $nonEncrypted->all()
        );

        $this->loadValues($data);
    }

    public function save(): self
    {
        $properties = $this->toCollection();

        event(new SavingSettings($properties, $this->originalValues, $this));

        $values = $this->mapper->save(static::class, $properties);

        $this->fill($values);
        $this->originalValues = $values;

        event(new SettingsSaved($this));

        return $this;
    }

    public function lock(string ...$properties): void
    {
        $this->ensureConfigIsLoaded();

        $this->config->lock(...$properties);
    }

    public function unlock(string ...$properties): void
    {
        $this->ensureConfigIsLoaded();

        $this->config->unlock(...$properties);
    }

    public function isLocked(string $property): bool
    {
        return in_array($property, $this->getLockedProperties(), true);
    }

    public function getLockedProperties(): array
    {
        $this->ensureConfigIsLoaded();

        return $this->config->getLocked()->toArray();
    }

    /**
     * @throws JsonException
     */
    public function toResponse($request): JsonResponse|Response
    {
        return response()->json($this->toJson());
    }

    /**
     * @throws JsonException
     */
    public function toJson($options = 0): string
    {
        return json_encode($this->toArray(), JSON_THROW_ON_ERROR | $options);
    }

    public function getRepository(): SettingsRepository
    {
        $this->ensureConfigIsLoaded();

        return $this->config->getRepository();
    }

    public function refresh(): self
    {
        $this->config->clearCachedLockedProperties();

        $this->loaded = false;
        $this->loadValues();

        return $this;
    }

    public function __get($name)
    {
        // Attempt to get a fallback value for the missing setting.
        $fallback = $this->missingSettingFallback($name);

        // If a fallback exists, use it.
        if ($fallback !== null) {
            return $fallback;
        }

        // In non-production environments, log a warning instead of throwing.
        if (! app()->environment('production') && Schema::hasTable('settings')) {
            logger()->warning("Missing setting '{$name}' in '".static::class."'.");

            // Return null to prevent breaking migrations.
            return null;
        }

        // Default to the parent behavior if no fallback exists and in production.
        return parent::__get($name);
    }

    public function __set($name, $value)
    {
        $this->loadValues();

        $this->{$name} = $value;
    }

    private function loadValues(?array $values = null): self
    {
        if ($this->loaded) {
            return $this;
        }

        // Ensure the configuration and mapper are initialized.
        $this->ensureConfigIsLoaded();

        $values ??= $this->mapper->load(static::class);

        $this->loaded = true;

        $this->fill($values);
        $this->originalValues = collect($values);

        event(new SettingsLoaded($this));

        return $this;
    }

    private function ensureConfigIsLoaded(): self
    {
        if ($this->configInitialized) {
            return $this;
        }

        $this->mapper = app(SettingsMapper::class);
        $this->config = $this->mapper->initialize(static::class);
        $this->configInitialized = true;

        return $this;
    }

    protected function missingSettingFallback(string $property): mixed
    {
        // Avoid errors during migrations.
        if (! Schema::hasTable('settings')) {
            return $this->getDefaultValueForProperty($property);
        }

        // Return the default value if it exists.
        return $this->getDefaultValueForProperty($property);
    }

    private function getDefaultValueForProperty(string $property): mixed
    {
        if (property_exists($this, $property)) {
            $reflection = new ReflectionProperty($this, $property);

            // Handle boolean type defaults.
            if ($reflection->getType() && $reflection->getType()->getName() === 'bool') {
                return false;
            }

            // Handle integer type defaults.
            if ($reflection->getType() && $reflection->getType()->getName() === 'int') {
                return 0;
            }

            // Handle string type defaults.
            if ($reflection->getType() && $reflection->getType()->getName() === 'string') {
                return '';
            }

            // Return the default value if defined.
            if ($reflection->hasDefaultValue()) {
                return $reflection->getDefaultValue();
            }

            // Allow null only if the property type permits it.
            if ($reflection->getType()->allowsNull()) {
                return null;
            }
        }

        return null;
    }
}
