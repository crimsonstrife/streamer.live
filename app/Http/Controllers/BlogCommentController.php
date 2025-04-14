<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class BlogCommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'text' => ['required', 'string', 'max:1000'],
        ]);

        Comment::create([
            'text' => $request->input('text'),
            'reply_id' => $request->input('reply_id'),
            'commented_on_type' => get_class($post),
            'commented_on_id' => $post->id,
            'commented_by_type' => get_class(auth()->user()),
            'commented_by_id' => auth()->id(),
            'approved' => true,
        ]);

        return back()->with('success', 'Comment added successfully.');
    }
}
