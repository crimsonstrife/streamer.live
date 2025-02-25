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
    public bool $showModal = false;
    public $selectedBlockType = '';
    public $isPreviewMode = false; // Track preview mode

    #[On('updateWysiwygContent')]
    public function updateWysiwygContent($data)
    {
        foreach ($this->assignedBlocks as &$block) {
            if ($block['id'] == $data['id']) {
                $block['content']['html'] = $data['content'];
                break;
            }
        }
    }

    public function mount($page)
    {
        $this->page = Page::findOrFail($page);
        $this->availableBlocks = Block::nativeBlocks();
        $this->assignedBlocks = $this->page->blocks()
            ->orderBy('page_block.order')
            ->get()
            ->map(fn($block) => [
                'id' => $block->id,
                'type' => $block->type,
                'name' => $block->name,
                'display_name' => $block->display_name,
                'content' => $block->content ?? [],
            ])->toArray();
    }

    public function openModal()
    {
        $this->showModal = true;
    }

    public function closeModal()
    {
        $this->showModal = false;
        $this->selectedBlockType = '';
    }

    public function addBlock()
    {
        if ($this->selectedBlockType) {
            $blockData = $this->availableBlocks[$this->selectedBlockType];

            $uniqueName = Str::slug($blockData['display_name']) . '-' . now()->timestamp;

            $block = Block::create([
                'name' => $uniqueName,
                'display_name' => $blockData['display_name'],
                'type' => $blockData['type'],
                'content' => $blockData['content'],
            ]);

            $this->page->blocks()->attach($block->id, ['order' => count($this->assignedBlocks)]);

            $this->assignedBlocks = $this->page->blocks()
                ->orderBy('page_block.order')
                ->get()
                ->map(fn($block) => [
                    'id' => $block->id,
                    'type' => $block->type,
                    'name' => $block->name,
                    'display_name' => $block->display_name,
                    'content' => $block->content ?? [],
                ])->toArray();

            $this->closeModal();
        }
    }

    public function updateBlockOrder($orderedIds)
    {
        foreach ($orderedIds as $index => $block) {
            $blockId = $block['value'] ?? $block['id'] ?? null;
            if ($blockId) {
                $this->page->blocks()->syncWithoutDetaching([$blockId => ['order' => $index]]);
            }
        }

        // Refresh without reloading the page
        $this->assignedBlocks = $this->page->blocks()
            ->orderBy('page_block.order')
            ->get()
            ->map(fn($block) => [
                'id' => $block->id,
                'type' => $block->type,
                'name' => $block->name,
                'display_name' => $block->display_name,
                'content' => $block->content ?? [],
            ])->toArray();
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
            Block::where('id', $blockData['id'])->update(['content' => $blockData['content']]);
        }

        session()->flash('success', 'Page updated successfully!');
    }

    public function render()
    {
        return view('livewire.page-builder', [
            'availableBlocks' => $this->availableBlocks,
            'assignedBlocks' => $this->assignedBlocks,
            'blocks' => $this->page->blocks,
            'isPreviewMode' => $this->isPreviewMode,
        ])->layout('layouts.app');
    }
}
