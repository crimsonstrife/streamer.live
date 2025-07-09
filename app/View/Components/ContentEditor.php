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

    /**
     * Create a new component instance.
     *
     * @param string|null $id
     * @param string|null $name
     * @param string|null $value
     */
    public function __construct(?string $id = 'content-editor', ?string $name = 'content', ?string $value = '')
    {
        $this->id = $id;
        $this->name = $name;
        $this->value = $value;
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
