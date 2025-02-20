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
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();
    }

    private function refreshBlocks()
    {
        $this->assignedBlocks = $this->page->blocks()
            ->orderBy('page_block.order')
            ->get()
            ->map(fn($block) => [
                'id' => $block->id,
                'type' => $block->type,
                'content' => $block->content,
            ])
            ->toArray();
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
        $this->page = Page::findOrFail($page);
        $this->availableBlocks = Block::nativeBlocks();
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();

        $this->blocks = $this->page->blocks()
            ->orderBy('page_block.order')
            ->get()
            ->map(function ($block) {
                return [
                    'id' => $block->id,
                    'type' => $block->type,
                    'name' => $block->name,
                    'display_name' => $block->display_name,
                    'content' => $block->content ?? [],
                ];
            })->toArray();
    }

    public function addBlock()
    {
        if ($this->selectedBlockType) {
            $blockData = $this->availableBlocks[$this->selectedBlockType];
            $uniqueName = Str::slug($blockData['display_name']) . '-' . now()->timestamp;
            $block = Block::create(['name' => $uniqueName, 'display_name' => $blockData['display_name'], 'type' => $blockData['type'], 'content' => $blockData['content']]);
            $this->page->blocks()->attach($block->id, ['order' => count($this->assignedBlocks)]);
            $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();

            $this->dispatch('refreshComponent');

            // Reset state
            $this->closeModal();
            $this->selectedBlockType = '';
        }
    }

    public function removeBlock($blockId)
    {
        $this->page->blocks()->detach($blockId);
        $this->assignedBlocks = array_filter($this->assignedBlocks, fn($block) => $block['id'] !== $blockId);
        Block::destroy($blockId);

        $this->dispatch('refreshComponent');
    }

    public function updateBlockOrder($orderedIds)
    {
        foreach ($orderedIds as $index => $blockData) {
            $blockId = is_array($blockData) ? $blockData['value'] : $blockData;

            // Ensure block ID is numeric before using it
            if (!is_numeric($blockId)) {
                \Log::error("Invalid block ID:", $blockId);
                continue;
            }

            $this->page->blocks()->syncWithoutDetaching([$blockId => ['order' => $index]]);
        }

        // Refresh assigned blocks
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get();

        // Force Livewire to refresh
        $this->dispatch('refreshComponent');
    }

    public function updateBlockContent($index, $field, $value)
    {
        if (isset($this->assignedBlocks[$index])) {
            $this->assignedBlocks[$index]['content'][$field] = $value;
        }

        $this->dispatch('refreshComponent');
    }

    public function save()
    {
        foreach ($this->assignedBlocks as $blockData) {
            $block = Block::find($blockData['id']);
            if ($block) {
                $block->update(['content' => $blockData['content']]);
            }
        }

        // Force Livewire to refresh and re-render
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();

        // Dispatch the refresh event
        $this->dispatch('refreshComponent');

        // Flash a success message
        session()->flash('success', 'Page updated successfully!');
    }

    public function render()
    {
        return view('livewire.page-builder', [
            'availableBlocks' => $this->availableBlocks,
            'assignedBlocks' => $this->page->blocks()->orderBy('page_block.order')->get()->toArray(),
            'blocks' => $this->page->blocks()->orderBy('page_block.order')->get(),
        ])->layout('layouts.app');
    }
}
