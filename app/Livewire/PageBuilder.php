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

    public function mount($page)
    {
        $pageModel = new Page();
        $this->page = $pageModel->findOrFail($page);
        $this->availableBlocks = Block::all();
        $this->assignedBlocks = $this->page->blocks()->pluck('blocks.id')->toArray();
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

    public function updateBlockOrder($orderedIds)
    {
        foreach ($orderedIds as $index => $id) {
            $block = Block::find($id);
            if ($block) {
                $block->pages()->updateExistingPivot($this->page->id, ['order' => $index]);
            }
        }
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
            'blocks' => $this->page->blocks,
        ])->layout('layouts.app');
    }
}
