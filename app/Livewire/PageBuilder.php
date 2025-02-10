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

    protected $listeners = ['refreshComponent' => '$refresh'];

    #[On('refreshComponent')]
    public function refreshComponent()
    {
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get();
    }

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
            $uniqueName = Str::slug($blockData['display_name']) . '-' . now()->timestamp;

            $block = (new Block())->create([
                'name' => $uniqueName,
                'display_name' => $blockData['display_name'],
                'type' => $blockData['type'],
                'content' => $blockData['content'],
            ]);

            // Attach block to the page and ensure ordering
            $this->page->blocks()->attach($block->id, ['order' => count($this->assignedBlocks)]);

            // Reload full block objects to avoid passing IDs
            $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get();

            // Force Livewire to refresh
            $this->dispatch('refreshComponent');

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
