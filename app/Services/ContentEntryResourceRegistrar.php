<?php

namespace App\Services;

use App\Filament\Resources\ContentEntries\ContentEntryResource;
use App\Models\ContentObjects\ContentType;
use Illuminate\Support\Facades\Schema;

class ContentEntryResourceRegistrar
{
    /** @var array<string, class-string<ContentEntryResource>> */
    private static array $resourceClasses = [];

    /**
     * Build and return concrete resource classes for all active content types.
     *
     * @return array<class-string<ContentEntryResource>>
     */
    public static function getResources(): array
    {
        if (! empty(self::$resourceClasses)) {
            return array_values(self::$resourceClasses);
        }

        if (! Schema::hasTable('content_types')) {
            return [];
        }

        $contentTypes = ContentType::active()->orderBy('sort_order')->get();

        foreach ($contentTypes as $contentType) {
            $className = self::buildResourceClass($contentType);
            if ($className) {
                self::$resourceClasses[$contentType->slug] = $className;
            }
        }

        return array_values(self::$resourceClasses);
    }

    /**
     * Clear cached resource classes (useful after creating/updating content types).
     */
    public static function clearCache(): void
    {
        self::$resourceClasses = [];
    }

    /**
     * Dynamically create a named concrete resource class and its page classes
     * for a given content type.
     */
    private static function buildResourceClass(ContentType $contentType): ?string
    {
        $prefix = self::toClassName($contentType->slug);
        $resourceClass = "App\\Filament\\Resources\\ContentEntries\\Generated\\{$prefix}Resource";

        if (class_exists($resourceClass)) {
            return $resourceClass;
        }

        $slug = addslashes($contentType->slug);
        $name = addslashes($contentType->name);
        $singularName = addslashes($contentType->singular_name);
        $icon = addslashes($contentType->icon ?? 'fas-file-alt');
        $id = $contentType->id;
        $hasRevisor = $contentType->has_revisor ? 'true' : 'false';

        // Generate page classes that bind to this specific resource
        self::buildPageClasses($prefix, $resourceClass);

        $pagesNamespace = "App\\Filament\\Resources\\ContentEntries\\Generated\\{$prefix}Pages";

        $code = <<<PHP
namespace App\Filament\Resources\ContentEntries\Generated;

use App\Filament\Resources\ContentEntries\ContentEntryResource;

class {$prefix}Resource extends ContentEntryResource
{
    protected static ?string \$slug = 'content/{$slug}';
    protected static ?string \$navigationGroup = 'Content';
    protected static ?string \$navigationIcon = '{$icon}';
    protected static ?string \$navigationLabel = '{$name}';
    protected static ?string \$modelLabel = '{$singularName}';
    protected static ?string \$pluralModelLabel = '{$name}';
    protected static ?string \$recordTitleAttribute = 'title';

    protected static ?int \$contentTypeId = {$id};

    public static function getPages(): array
    {
        \$pages = [
            'index' => \\{$pagesNamespace}\\ListEntries::route('/'),
            'create' => \\{$pagesNamespace}\\CreateEntry::route('/create'),
            'edit' => \\{$pagesNamespace}\\EditEntry::route('/{record}/edit'),
        ];

        if ({$hasRevisor}) {
            \$pages['versions'] = \\{$pagesNamespace}\\ListVersions::route('/{record}/versions');
            \$pages['view_version'] = \\{$pagesNamespace}\\ViewVersion::route('/{record}/versions/{version}');
        }

        return \$pages;
    }
}
PHP;

        eval($code); // @codingStandardsIgnoreLine

        return $resourceClass;
    }

    /**
     * Generate the Filament page classes for a content type's resource.
     * Each page class needs its own $resource static binding.
     */
    private static function buildPageClasses(string $prefix, string $resourceClass): void
    {
        $ns = "App\\Filament\\Resources\\ContentEntries\\Generated\\{$prefix}Pages";

        // ListEntries
        if (! class_exists("{$ns}\\ListEntries")) {
            eval(<<<PHP
namespace {$ns};

class ListEntries extends \\Filament\\Resources\\Pages\\ListRecords
{
    protected static string \$resource = \\{$resourceClass}::class;

    protected function getHeaderActions(): array
    {
        return [
            \\Filament\\Actions\\CreateAction::make(),
        ];
    }
}
PHP);
        }

        // CreateEntry - must create in draft context so the record lands in content_entries_drafts
        if (! class_exists("{$ns}\\CreateEntry")) {
            eval(<<<PHP
namespace {$ns};

class CreateEntry extends \\Filament\\Resources\\Pages\\CreateRecord
{
    protected static string \$resource = \\{$resourceClass}::class;

    protected function handleRecordCreation(array \$data): \\Illuminate\\Database\\Eloquent\\Model
    {
        \$model = new (static::getModel());
        \$model->setRevisorContext(\\Indra\\Revisor\\Enums\\RevisorContext::Draft);
        \$model->fill(\$data);
        \$model->save();

        return \$model;
    }
}
PHP);
        }

        // EditEntry (extends Revisor EditRecord for draft context)
        if (! class_exists("{$ns}\\EditEntry")) {
            eval(<<<PHP
namespace {$ns};

class EditEntry extends \\Indra\\RevisorFilament\\Filament\\EditRecord
{
    protected static string \$resource = \\{$resourceClass}::class;

    public function hydrate(): void
    {
        if (\$this->record instanceof \\Illuminate\\Database\\Eloquent\\Model
            && \$this->record->getKey()
            && ! \$this->record->isDraftTableRecord()
        ) {
            \$this->record = (\$this->record)::withDraftContext()->findOrFail(\$this->record->getKey());
        }
    }
}
PHP);
        }

        // ListVersions
        if (! class_exists("{$ns}\\ListVersions")) {
            eval(<<<PHP
namespace {$ns};

class ListVersions extends \\Indra\\RevisorFilament\\Filament\\ListVersions
{
    protected static string \$resource = \\{$resourceClass}::class;

    public function hydrate(): void
    {
        if (\$this->record instanceof \\Illuminate\\Database\\Eloquent\\Model
            && \$this->record->getKey()
            && ! \$this->record->isDraftTableRecord()
        ) {
            \$this->record = (\$this->record)::withDraftContext()->findOrFail(\$this->record->getKey());
        }
    }
}
PHP);
        }

        // ViewVersion
        if (! class_exists("{$ns}\\ViewVersion")) {
            eval(<<<PHP
namespace {$ns};

class ViewVersion extends \\Indra\\RevisorFilament\\Filament\\ViewVersion
{
    protected static string \$resource = \\{$resourceClass}::class;
}
PHP);
        }
    }

    /**
     * Convert a slug like "my-content-type" to PascalCase "MyContentType".
     */
    private static function toClassName(string $slug): string
    {
        return str_replace(' ', '', ucwords(str_replace('-', ' ', $slug)));
    }
}
