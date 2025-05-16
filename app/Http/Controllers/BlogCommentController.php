<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class BlogCommentController extends Controller
{
    public function store(Request $request, Post $post): RedirectResponse
    {
        $data = $request->validate([
            'text' => ['required', 'string', 'max:1000'],
        ]);

        try {
            Comment::create([
                'text' => $data['text'],
                'reply_id' => $request->input('reply_id'),
                'commented_on_type' => get_class($post),
                'commented_on_id' => $post->id,
                'commented_by_type' => get_class($request->user()),
                'commented_by_id' => $request->user()->getKey(),
                'approved' => true,
            ]);
        } catch (Throwable $e) {
            Log::error('Comment::create failed with:', $e->getMessage());
        }

        return back()->with('success', 'Comment added successfully.');
    }
}
