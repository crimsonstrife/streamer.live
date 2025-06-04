<?php

namespace App\Http\Controllers;

use App\Models\BlogObjects\Comment;
use App\Models\BlogObjects\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function togglePost(Request $request, Post $post, string $type): RedirectResponse
    {
        $status = $post->toggleReaction($type, $request->user());

        return back()->with('success', "Reaction {$status}.");
    }

    public function toggleComment(Request $request, Comment $comment, string $type): RedirectResponse
    {
        $status = $comment->toggleReaction($type, $request->user());

        return back()->with('success', "Reaction {$status}.");
    }
}
