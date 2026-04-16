<?php

namespace App\Services;

use App\Models\ContentObjects\ContentField;
use Filament\Forms\Components;
use Filament\Tables\Columns;
use Illuminate\Support\Str;

class ContentFieldFactory
{
    /**
     * Convert a ContentField definition into a Filament form component.
     * The state path is prefixed with "data." since field values live in the JSON column.
     */
    public static function toFormComponent(ContentField $field): ?Components\Component
    {
        $statePath = "data.{$field->name}";

        $component = match ($field->type) {
            'text' => self::makeTextInput($field, $statePath),
            'textarea' => self::makeTextarea($field, $statePath),
            'richtext' => self::makeRichEditor($field, $statePath),
            'number' => self::makeNumberInput($field, $statePath),
            'date' => Components\DatePicker::make($statePath)->label($field->label),
            'datetime' => Components\DateTimePicker::make($statePath)->label($field->label),
            'select' => self::makeSelect($field, $statePath),
            'toggle' => Components\Toggle::make($statePath)->label($field->label),
            'color' => Components\ColorPicker::make($statePath)->label($field->label),
            'image' => self::makeImageUpload($field, $statePath),
            'file' => self::makeFileUpload($field, $statePath),
            'url' => Components\TextInput::make($statePath)->label($field->label)->url(),
            'email' => Components\TextInput::make($statePath)->label($field->label)->email(),
            'repeater' => self::makeRepeater($field, $statePath),
            default => null,
        };

        if ($component === null) {
            return null;
        }

        if ($field->is_required && method_exists($component, 'required')) {
            $component->required();
        }

        if ($field->default_value !== null && method_exists($component, 'default')) {
            $component->default($field->default_value);
        }

        if (method_exists($component, 'columnSpan')) {
            $component->columnSpan($field->column_span);
        }

        return $component;
    }

    /**
     * Convert a ContentField definition into a Filament table column.
     * The state path is prefixed with "data." to read from the JSON column.
     */
    public static function toTableColumn(ContentField $field): ?Columns\Column
    {
        $statePath = "data.{$field->name}";

        return match ($field->type) {
            'text', 'url', 'email' => Columns\TextColumn::make($statePath)
                ->label($field->label)
                ->searchable($field->is_searchable)
                ->sortable()
                ->limit(50),
            'textarea' => Columns\TextColumn::make($statePath)
                ->label($field->label)
                ->limit(50)
                ->searchable($field->is_searchable),
            'richtext' => Columns\TextColumn::make($statePath)
                ->label($field->label)
                ->html()
                ->limit(100),
            'number' => Columns\TextColumn::make($statePath)
                ->label($field->label)
                ->numeric()
                ->sortable(),
            'date' => Columns\TextColumn::make($statePath)
                ->label($field->label)
                ->date()
                ->sortable(),
            'datetime' => Columns\TextColumn::make($statePath)
                ->label($field->label)
                ->dateTime()
                ->sortable(),
            'select' => Columns\TextColumn::make($statePath)
                ->label($field->label)
                ->badge(),
            'toggle' => Columns\IconColumn::make($statePath)
                ->label($field->label)
                ->boolean(),
            'color' => Columns\ColorColumn::make($statePath)
                ->label($field->label),
            'image' => Columns\ImageColumn::make($statePath)
                ->label($field->label),
            default => null,
        };
    }

    /**
     * Build the options form schema shown when editing a field definition.
     * This is used in the ContentFieldsRelationManager to show type-specific config.
     */
    public static function getOptionsSchema(string $fieldType): array
    {
        return match ($fieldType) {
            'text', 'url', 'email' => [
                Components\TextInput::make('options.placeholder')->label('Placeholder'),
                Components\TextInput::make('options.max_length')->label('Max Length')->numeric(),
            ],
            'textarea' => [
                Components\TextInput::make('options.placeholder')->label('Placeholder'),
                Components\TextInput::make('options.rows')->label('Rows')->numeric()->default(3),
            ],
            'number' => [
                Components\TextInput::make('options.min')->label('Minimum')->numeric(),
                Components\TextInput::make('options.max')->label('Maximum')->numeric(),
                Components\TextInput::make('options.step')->label('Step')->numeric()->default(1),
            ],
            'select' => [
                Components\Repeater::make('options.choices')
                    ->label('Choices')
                    ->schema([
                        Components\TextInput::make('value')->required(),
                        Components\TextInput::make('label')->required(),
                    ])
                    ->columns(2)
                    ->defaultItems(1),
                Components\Toggle::make('options.multiple')->label('Allow Multiple Selections'),
            ],
            'image', 'file' => [
                Components\TextInput::make('options.directory')
                    ->label('Upload Directory')
                    ->default('content'),
                Components\Toggle::make('options.multiple')->label('Allow Multiple Files'),
            ],
            'repeater' => [
                Components\Repeater::make('options.sub_fields')
                    ->label('Sub-Fields')
                    ->schema([
                        Components\TextInput::make('name')->required(),
                        Components\TextInput::make('label')->required(),
                        Components\Select::make('type')
                            ->options(self::getSimpleFieldTypes())
                            ->required(),
                    ])
                    ->columns(3)
                    ->defaultItems(1),
            ],
            default => [],
        };
    }

    /**
     * All available field types for the type selector.
     */
    public static function getFieldTypes(): array
    {
        return [
            'text' => 'Text',
            'textarea' => 'Textarea',
            'richtext' => 'Rich Text',
            'number' => 'Number',
            'date' => 'Date',
            'datetime' => 'Date & Time',
            'select' => 'Select / Dropdown',
            'toggle' => 'Toggle',
            'color' => 'Color Picker',
            'image' => 'Image Upload',
            'file' => 'File Upload',
            'url' => 'URL',
            'email' => 'Email',
            'repeater' => 'Repeater (Nested Fields)',
        ];
    }

    /**
     * Simpler field types for use inside repeater sub-fields (no nesting).
     */
    public static function getSimpleFieldTypes(): array
    {
        return collect(self::getFieldTypes())
            ->except('repeater')
            ->toArray();
    }

    // ── Private builders ────────────────────────────────────────────

    private static function makeTextInput(ContentField $field, string $statePath): Components\TextInput
    {
        $input = Components\TextInput::make($statePath)->label($field->label);

        if ($placeholder = $field->getOption('placeholder')) {
            $input->placeholder($placeholder);
        }

        if ($maxLength = $field->getOption('max_length')) {
            $input->maxLength((int) $maxLength);
        }

        return $input;
    }

    private static function makeTextarea(ContentField $field, string $statePath): Components\Textarea
    {
        $input = Components\Textarea::make($statePath)->label($field->label);

        if ($placeholder = $field->getOption('placeholder')) {
            $input->placeholder($placeholder);
        }

        if ($rows = $field->getOption('rows')) {
            $input->rows((int) $rows);
        }

        return $input;
    }

    private static function makeRichEditor(ContentField $field, string $statePath): Components\RichEditor
    {
        return Components\RichEditor::make($statePath)
            ->label($field->label)
            ->columnSpanFull();
    }

    private static function makeNumberInput(ContentField $field, string $statePath): Components\TextInput
    {
        $input = Components\TextInput::make($statePath)
            ->label($field->label)
            ->numeric();

        if (($min = $field->getOption('min')) !== null) {
            $input->minValue((float) $min);
        }

        if (($max = $field->getOption('max')) !== null) {
            $input->maxValue((float) $max);
        }

        if ($step = $field->getOption('step')) {
            $input->step((float) $step);
        }

        return $input;
    }

    private static function makeSelect(ContentField $field, string $statePath): Components\Select
    {
        $select = Components\Select::make($statePath)->label($field->label);

        $choices = $field->getOption('choices', []);
        if (! empty($choices)) {
            $options = collect($choices)->pluck('label', 'value')->toArray();
            $select->options($options);
        }

        if ($field->getOption('multiple')) {
            $select->multiple();
        }

        return $select;
    }

    private static function makeImageUpload(ContentField $field, string $statePath): Components\FileUpload
    {
        $upload = Components\FileUpload::make($statePath)
            ->label($field->label)
            ->image()
            ->directory($field->getOption('directory', 'content'));

        if ($field->getOption('multiple')) {
            $upload->multiple();
        }

        return $upload;
    }

    private static function makeFileUpload(ContentField $field, string $statePath): Components\FileUpload
    {
        $upload = Components\FileUpload::make($statePath)
            ->label($field->label)
            ->directory($field->getOption('directory', 'content'));

        if ($field->getOption('multiple')) {
            $upload->multiple();
        }

        return $upload;
    }

    private static function makeRepeater(ContentField $field, string $statePath): Components\Repeater
    {
        $subFields = $field->getOption('sub_fields', []);

        $schema = collect($subFields)->map(function (array $subField) {
            $fakeField = new ContentField([
                'name' => $subField['name'],
                'label' => $subField['label'],
                'type' => $subField['type'],
                'options' => $subField['options'] ?? [],
                'is_required' => $subField['is_required'] ?? false,
                'column_span' => 1,
            ]);

            // Sub-fields don't get the "data." prefix since they're already nested
            return self::toFormComponentRaw($fakeField, $subField['name']);
        })->filter()->toArray();

        return Components\Repeater::make($statePath)
            ->label($field->label)
            ->schema($schema)
            ->defaultItems(0)
            ->columnSpanFull();
    }

    /**
     * Build a form component without the "data." prefix (used for repeater sub-fields).
     */
    private static function toFormComponentRaw(ContentField $field, string $statePath): ?Components\Component
    {
        $component = match ($field->type) {
            'text' => self::makeTextInput($field, $statePath),
            'textarea' => self::makeTextarea($field, $statePath),
            'richtext' => self::makeRichEditor($field, $statePath),
            'number' => self::makeNumberInput($field, $statePath),
            'date' => Components\DatePicker::make($statePath)->label($field->label),
            'datetime' => Components\DateTimePicker::make($statePath)->label($field->label),
            'select' => self::makeSelect($field, $statePath),
            'toggle' => Components\Toggle::make($statePath)->label($field->label),
            'color' => Components\ColorPicker::make($statePath)->label($field->label),
            'image' => self::makeImageUpload($field, $statePath),
            'file' => self::makeFileUpload($field, $statePath),
            'url' => Components\TextInput::make($statePath)->label($field->label)->url(),
            'email' => Components\TextInput::make($statePath)->label($field->label)->email(),
            default => null,
        };

        if ($component && $field->is_required && method_exists($component, 'required')) {
            $component->required();
        }

        return $component;
    }
}
