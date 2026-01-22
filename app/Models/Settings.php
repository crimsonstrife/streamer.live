<?php

namespace App\Models;

use Exception;
use Illuminate\Container\Container;
use Illuminate\Support\Collection;
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
use Spatie\Onboard\Concerns\GetsOnboarded;
use Spatie\Onboard\Concerns\Onboardable;

abstract class Settings extends SpatieSettings implements Onboardable
{
    use GetsOnboarded;

    private SettingsMapper $mapper;

    private SettingsConfig $config;

    private bool $loaded = false;

    private bool $configInitialized = false;

    protected ?Collection $originalValues = null;

    abstract public static function group(): string;

    public static function repository(): ?string
    {
        return null;
    }

    public static function casts(): array
    {
        return [];
    }

    public static function encrypted(): array
    {
        return [];
    }

    /**
     * @return static
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

    public function __get($name)
    {
        $this->loadValues();

        return $this->{$name};
    }

    public function __set($name, $value)
    {
        $this->loadValues();

        $this->{$name} = $value;
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
        /** @var StoreObjects\Collection $encrypted */
        /** @var StoreObjects\Collection $nonEncrypted */
        $partitions = $this->toCollection()->partition(
            fn ($value, string $name) => $this->config->isEncrypted($name)
        );

        [$encrypted, $nonEncrypted] = [$partitions[0], $partitions[1]];

        /** @var TYPE_NAME $nonEncrypted */
        return array_merge(
            $encrypted->map(fn ($value) => Crypto::encrypt($value))->all(),
            $nonEncrypted->all()
        );
    }

    public function __unserialize(array $data): void
    {
        $this->loaded = false;

        $this->ensureConfigIsLoaded();

        /** @var StoreObjects\Collection $encrypted */
        /** @var StoreObjects\Collection $nonEncrypted */
        [$encrypted, $nonEncrypted] = collect($data)->partition(
            fn ($value, string $name) => $this->config->isEncrypted($name)
        )->values()->toArray();

        /** @var TYPE_NAME $nonEncrypted */
        $data = array_merge(
            $encrypted->map(fn ($value) => Crypto::decrypt($value))->all(),
            $nonEncrypted->all()
        );

        $this->loadValues($data);
    }

    /**
     * @param  StoreObjects\Collection|array  $properties
     * @return $this
     */
    public function fill($properties): self
    {
        foreach ($properties as $name => $payload) {
            $this->{$name} = $payload;
        }

        return $this;
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

    public function lock(string ...$properties)
    {
        $this->ensureConfigIsLoaded();

        $this->config->lock(...$properties);
    }

    public function unlock(string ...$properties)
    {
        $this->ensureConfigIsLoaded();

        $this->config->unlock(...$properties);
    }

    public function isLocked(string $property): bool
    {
        return in_array($property, $this->getLockedProperties());
    }

    public function isUnlocked(string $property): bool
    {
        return ! $this->isLocked($property);
    }

    public function getLockedProperties(): array
    {
        $this->ensureConfigIsLoaded();

        return $this->config->getLocked()->toArray();
    }

    public function toCollection(): Collection
    {
        $this->loadValues();

        $this->ensureConfigIsLoaded();

        return $this->config
            ->getReflectedProperties()
            ->mapWithKeys(fn (ReflectionProperty $property) => [
                $property->getName() => $this->{$property->getName()},
            ]);
    }

    /**
     * @throws JsonException
     */
    public function toJson($options = 0): string
    {
        return json_encode($this->toArray(), JSON_THROW_ON_ERROR | $options);
    }

    /**
     * @throws JsonException
     */
    public function toResponse($request): \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
    {
        return response()->json($this->toJson());
    }

    public function getRepository(): SettingsRepository
    {
        $this->ensureConfigIsLoaded();

        return $this->config->getRepository();
    }

    /**
     * @throws MissingSettings
     */
    public function refresh(): self
    {
        $this->config->clearCachedLockedProperties();

        $this->loaded = false;
        $this->loadValues();

        return $this;
    }

    /**
     * @throws MissingSettings
     */
    private function loadValues(StoreObjects\Collection|array $values = null): self
    {
        if ($this->loaded) {
            return $this;
        }

        // hydrate the mapper + config first
        $this->ensureConfigIsLoaded();

        $values ??= $this->mapper->load(static::class);


        $this->loaded = true;
        if ($values !== null) {
            $this->fill($values);
            $this->originalValues = collect($values);
        }

        event(new SettingsLoaded($this , false));

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
}
