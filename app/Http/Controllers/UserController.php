<?php

namespace App\Http\Controllers;

use App\Models\AuthObjects\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        \Log::info('Search query received:', ['query' => $query]);

        $users = User::where('username', 'like', "%{$query}%")
            ->limit(10)
            ->get(['id', 'username',]);

        \Log::info('Users returned:', ['users' => $users]);

        return response()->json($users);
    }
}
