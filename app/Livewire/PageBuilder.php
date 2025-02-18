<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\Attributes\On;
use App\Models\Page;
use App\Models\Block;
use Illuminate\Support\Str;

class PageBuilder extends Component
{
    public $page;
    public $blocks = [];
    public $availableBlocks = [];
    public $assignedBlocks = [];
    public bool $showModal = false;
    public $selectedBlockType = '';

    protected $listeners = ['refreshComponent' => '$refresh'];

    #[On('refreshComponent')]
    public function refreshComponent()
    {
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get();
    }

    public function openModal()
    {
        $this->showModal = true;
    }

    public function closeModal()
    {
        $this->showModal = false;
        $this->selectedBlockType = ''; // Reset selection
    }

    public function mount($page)
    {
        $pageModel = new Page();
        $this->page = $pageModel->findOrFail($page);
        $this->availableBlocks = Block::nativeBlocks();

        // Store full block data, not just IDs
        $this->assignedBlocks = $this->page->blocks()
            ->orderBy('page_block.order')
            ->get()
            ->map(fn($block) => [
                'id' => $block->id,
                'type' => $block->type,
                'content' => $block->content,
            ])->toArray();

        $this->blocks = $this->assignedBlocks; // Set $blocks from assignedBlocks
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

            $this->closeModal(); // Close modal after adding a block

            // Force Livewire to refresh
            $this->dispatch('refreshComponent');

            $this->selectedBlockType = ''; // Reset selection
        }
    }

    public function removeBlock($blockId)
    {
        $this->page->blocks()->detach($blockId);

        // Ensure we're working with IDs, not full block objects
        $this->assignedBlocks = array_filter($this->assignedBlocks, function ($block) use ($blockId) {
            return $block['id'] !== $blockId;
        });

        // Force Livewire to refresh
        $this->dispatch('refreshComponent');

        // Delete the block from the database
        Block::destroy($blockId);

        // Flash a success message
        session()->flash('success', 'Block removed successfully!');
    }

    public function updateBlockOrder($orderedIds)
    {
        foreach ($orderedIds as $index => $block) {
            $blockId = $block['value']; // Use 'value' from the incoming array
            $this->page->blocks()->syncWithoutDetaching([$blockId => ['order' => $index]]);
        }

        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get();
        $this->dispatch('refreshComponent');
    }

    public function updateBlockContent($index, $field, $value)
    {
        if (isset($this->assignedBlocks[$index])) {
            $this->assignedBlocks[$index]['content'][$field] = $value;
        }
    }

    public function save()
    {
        foreach ($this->assignedBlocks as $blockData) {
            $block = Block::find($blockData['id']);
            if ($block) {
                $block->update(['content' => $blockData['content']]);
            }
        }

        // Force Livewire to refresh
        $this->dispatch('refreshComponent');

        // Flash a success message
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
