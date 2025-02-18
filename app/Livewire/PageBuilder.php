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
        $this->page = Page::findOrFail($page);
        $this->availableBlocks = Block::nativeBlocks();
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();
    }

    public function addBlock()
    {
        if ($this->selectedBlockType) {
            $blockData = $this->availableBlocks[$this->selectedBlockType];
            $uniqueName = Str::slug($blockData['display_name']) . '-' . now()->timestamp;
            $block = Block::create(['name' => $uniqueName, 'display_name' => $blockData['display_name'], 'type' => $blockData['type'], 'content' => $blockData['content']]);
            $this->page->blocks()->attach($block->id, ['order' => count($this->assignedBlocks)]);
            $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();
            $this->closeModal();
            $this->dispatch('refreshComponent');
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
        foreach ($orderedIds as $index => $block) {
            $this->page->blocks()->syncWithoutDetaching([$block['value'] => ['order' => $index]]);
        }
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();
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
            Block::find($blockData['id'])?->update(['content' => $blockData['content']]);
        }
        $this->dispatch('refreshComponent');
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
