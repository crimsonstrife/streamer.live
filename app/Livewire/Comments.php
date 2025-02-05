<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Comment;

class Comments extends Component
{
    public $post;
    public $comment;
    public $parentId = null; // Track which comment is being replied to

    public function mount($post)
    {
        $this->post = $post;
    }

    public function setReply($commentId)
    {
        // If clicking the same reply button again, cancel reply
        $this->parentId = ($this->parentId === $commentId) ? null : $commentId;
    }

    public function addComment()
    {
        $this->validate(['comment' => 'required|string|max:1000']);

        $comment = new Comment([
            'post_id' => $this->post->id,
            'user_id' => auth()->id(),
            'content' => $this->comment,
            'parent_id' => $this->parentId,
        ]);
        $comment->save();

        $this->reset('comment', 'parentId');
    }

    public function render()
    {
        return view('livewire.comments', [
            'comments' => $this->post->comments()->with('children')->get(),
        ]);
    }
}
