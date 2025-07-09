<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ContentEditor extends Component
{
    public ?string $id;
    public ?string $name;
    public ?string $value;
    public bool $mentions;

    /**
     * Create a new component instance.
     *
     * @param string|null $id
     * @param string|null $name
     * @param string|null $value
     * @param bool        $mentions
     */
    public function __construct(?string $id = 'content-editor', ?string $name = 'content', ?string $value = '', bool $mentions = false)
    {
        $this->id = $id;
        $this->name = $name;
        $this->value = $value;
        $this->mentions = $mentions;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render(): string|\Illuminate\View\View
    {
        return view('components.content-editor');
    }
}
