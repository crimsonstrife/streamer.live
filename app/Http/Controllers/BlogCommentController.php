<?php

namespace App\Http\Controllers;

use App\Models\BlogObjects\Comment;
use App\Models\BlogObjects\Post;
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

        $parentComment = null;

        // Creating a top-level comment on $post:
        if ($post->isCommentingLocked()) {
            abort(403, 'Comments are locked for this post.');
        }

        // Ensure $parentComment exists before proceeding:
        if ($request->input('reply_id')) {
            $parentComment = $post->comments()->findOrFail($request->input('reply_id'));

            // Ensure $parentComment exists before proceeding:
            // Creating a reply to $parentComment on $post:
            if (! $post->canReplyToComment($parentComment)) {
                abort(403, 'Replies are locked.');
            }
        }

        try {
            Comment::create([
                'text' => $data['text'],
                'reply_id' => $parentComment, // comment being replied to, null if top-level comment
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
