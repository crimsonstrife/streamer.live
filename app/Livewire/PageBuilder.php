<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Page;
use App\Models\Block;

class PageBuilder extends Component
{
    public $page;
    public $availableBlocks = [];
    public $assignedBlocks = [];

    public function mount(Page $page)
    {
        $this->page = $page;
        $this->availableBlocks = Block::all();
        $this->assignedBlocks = $page->blocks()->pluck('blocks.id')->toArray();
    }

    public function assignBlock($blockId)
    {
        if (!in_array($blockId, $this->assignedBlocks)) {
            $this->assignedBlocks[] = $blockId;
        }
    }

    public function removeBlock($blockId)
    {
        $this->assignedBlocks = array_diff($this->assignedBlocks, [$blockId]);
    }

    public function save()
    {
        $this->page->blocks()->sync($this->assignedBlocks);
        session()->flash('success', 'Page updated successfully!');
    }

    public function render()
    {
        return view('livewire.page-builder', [
            'availableBlocks' => $this->availableBlocks,
            'assignedBlocks' => Block::whereIn('id', $this->assignedBlocks)->get(),
        ]);
    }
}
