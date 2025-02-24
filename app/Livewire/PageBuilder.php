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
    public $unsavedBlocks = []; // Holds changes before saving
    public $availableBlocks = [];
    public $assignedBlocks = [];
    public bool $showModal = false;
    public $selectedBlockType = '';
    public $isPreviewMode = false; // Track preview mode

    protected $listeners = ['refreshComponent' => '$refresh'];

    #[On('refreshComponent')]
    public function refreshComponent()
    {
        $this->assignedBlocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();
    }

    #[On('reloadPage')]
    public function reloadPage()
    {
        $this->dispatch('refreshComponent')->self();
    }

    #[On('updateWysiwygContent')]
    public function updateWysiwygContent($editorId, $content)
    {
        // Extract block index from editor ID
        $index = str_replace("wysiwyg-editor-", "", $editorId);

        if (isset($this->blocks[$index])) {
            $this->blocks[$index]['content']['html'] = $content;
        }

        // Force refresh
        $this->dispatch('refreshComponent');
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

    public function togglePreview()
    {
        $this->isPreviewMode = !$this->isPreviewMode;
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

        // Initialize unsavedBlocks with the latest data
        $this->unsavedBlocks = $this->blocks;
    }

    public function addBlock()
    {
        if ($this->selectedBlockType) {
            $blockData = $this->availableBlocks[$this->selectedBlockType];

            // Generate unique name
            $uniqueName = Str::slug($blockData['display_name']) . '-' . now()->timestamp;

            // Create a new block
            $block = Block::create(['name' => $uniqueName, 'display_name' => $blockData['display_name'], 'type' => $blockData['type'], 'content' => $blockData['content']]);


            // Attach block to page
            $this->page->blocks()->attach($block->id, ['order' => count($this->blocks)]);

            // Reload blocks
            $this->blocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();

            $this->dispatch('refreshComponent');

            // Reset state
            $this->closeModal();
            $this->selectedBlockType = '';

            // Force Livewire to reload page completely
            $this->dispatch('reloadPage');
        }
    }

    public function removeBlock($blockId)
    {
        $this->page->blocks()->detach($blockId);
        $this->assignedBlocks = array_filter($this->assignedBlocks, fn($block) => $block['id'] !== $blockId);
        Block::destroy($blockId);

        $this->dispatch('refreshComponent');

        // Force Livewire to reload page completely
        $this->dispatch('reloadPage');
    }

    public function updateBlockOrder($orderedIds)
    {
        foreach ($orderedIds as $index => $block) {
            $blockId = is_array($block) ? $block['id'] : $block->id;
            $this->page->blocks()->syncWithoutDetaching([$blockId => ['order' => $index]]);
        }

        $this->blocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();
        $this->dispatch('refreshComponent');
    }

    public function updateBlockContent($index, $field, $value)
    {
        if (isset($this->unsavedBlocks[$index])) {
            $this->unsavedBlocks[$index]['content'][$field] = $value;
        }
    }

    public function save()
    {
        foreach ($this->unsavedBlocks as $blockData) {
            $block = Block::find($blockData['id']);
            if ($block) {
                $block->update(['content' => $blockData['content']]);
            }
        }

        // Sync database blocks with latest data
        $this->blocks = $this->page->blocks()->orderBy('page_block.order')->get()->toArray();
        $this->unsavedBlocks = $this->blocks;

        session()->flash('success', 'Page updated successfully!');
        $this->dispatch('refreshComponent');
    }

    public function render()
    {
        return view('livewire.page-builder', [
            'availableBlocks' => $this->availableBlocks,
            'assignedBlocks' => $this->page->blocks()->orderBy('page_block.order')->get()->toArray(),
            'blocks' => $this->unsavedBlocks, // Use unsavedBlocks to show changes live
            'isPreviewMode' => $this->isPreviewMode,
        ])->layout('layouts.app');
    }
}
