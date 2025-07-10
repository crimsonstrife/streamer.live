<?php

namespace App\Forms\Components;

use Closure;
use Filament\Forms\Components\Field;
use Filament\Support\Concerns\HasExtraAlpineAttributes;

class ContentEditor extends Field implements \Filament\Forms\Components\Contracts\CanBeLengthConstrained, \Filament\Forms\Components\Contracts\HasFileAttachments
{
    use \Filament\Forms\Components\Concerns\CanBeLengthConstrained;
    use \Filament\Forms\Components\Concerns\CanDisableGrammarly;
    use \Filament\Forms\Components\Concerns\HasExtraInputAttributes;
    use \Filament\Forms\Components\Concerns\HasFileAttachments;
    use \Filament\Forms\Components\Concerns\HasPlaceholder;
    use \Filament\Forms\Components\Concerns\InteractsWithToolbarButtons;
    use HasExtraAlpineAttributes;

    protected string $view = 'filament.components.content-editor';

    /**
     * Pass through a “disable Grammarly” flag if you want.
     */
    public function disableGrammarly(bool $condition = true): static
    {
        return $this->extraAttributes(['grammDisabled' => $condition]);
    }

    /**
     * Whether to enable @-mentions.
     */
    public function mentions(bool $enabled = true): static
    {
        return $this->extraAttributes(['mentions' => $enabled]);
    }
}
