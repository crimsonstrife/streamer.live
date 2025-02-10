<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Page;
use App\Models\Block;
use Illuminate\Support\Str;

class PageBuilder extends Component
{
    public $page;
    public $availableBlocks = [];
    public $assignedBlocks = [];
    public $selectedBlockType = '';

    public function mount($page)
    {
        $pageModel = new Page();
        $this->page = $pageModel->findOrFail($page);
        $this->availableBlocks = Block::nativeBlocks();
        // Ensure assignedBlocks only stores IDs
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get();
    }

    public function addBlock()
    {
        if ($this->selectedBlockType) {
            $blockData = $this->availableBlocks[$this->selectedBlockType];

            // Generate a unique block name by appending a timestamp
            $uniqueName = Str::slug($blockData['name']) . '-' . now()->timestamp;

            $block = (new Block())->create([
                'name' => $uniqueName,
                'type' => $blockData['type'],
                'content' => $blockData['content'],
            ]);

            $this->page->blocks()->attach($block->id, ['order' => count($this->assignedBlocks)]);

            // Store only IDs, not objects
            $this->assignedBlocks = $this->page->blocks()->pluck('blocks.id')->toArray();

            $this->selectedBlockType = ''; // Reset selection
        }
    }

    public function removeBlock($blockId)
    {
        $this->page->blocks()->detach($blockId);
        $this->assignedBlocks = array_diff($this->assignedBlocks, [$blockId]);
    }

    public function updateBlockOrder($orderedIds)
    {
        foreach ($orderedIds as $index => $id) {
            $this->page->blocks()->updateExistingPivot($id, ['order' => $index]);
        }
    }

    public function save()
    {
        session()->flash('success', 'Page updated successfully!');
    }

    public function render()
    {
        return view('livewire.page-builder', [
            'availableBlocks' => $this->availableBlocks,
            'assignedBlocks' => $this->assignedBlocks,
            'blocks' => $this->page->blocks,
        ])->layout('layouts.app');
    }
}
