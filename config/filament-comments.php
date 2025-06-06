<?php

return [
    /*
     * Whether or not user avatars should be displayed next to comments.
     */
    'display_avatars' => true,

    /*
     * The icons that are used in the comments component.
     */
    'icons' => [
        'action' => 'heroicon-s-chat-bubble-left-right',
        'delete' => 'heroicon-s-trash',
        'empty' => 'heroicon-s-chat-bubble-left-right',
    ],


    /*
     * The comment model to be used
     */
    'comment_model' => \Parallax\FilamentComments\Models\FilamentComment::class,

    /*
     * The policy that will be used to authorize actions against comments.
     */
    'model_policy' => \Parallax\FilamentComments\Policies\FilamentCommentPolicy::class,

    /*
     * The number of days after which soft-deleted comments should be deleted.
     *
     * Set to null if no comments should be deleted.
     */
    'prune_after_days' => 30,


    /*
     * Options: 'rich', 'markdown'
     */
    'editor' => 'rich',

    /*
     * The rich editor toolbar buttons that are available to users.
     */
    'toolbar_buttons' => [
        'blockquote',
        'bold',
        'bulletList',
        'codeBlock',
        'italic',
        'link',
        'orderedList',
        'redo',
        'strike',
        'underline',
        'undo',
    ],

    /*
     * The attribute used to display the user's name.
     */
    'user_name_attribute' => 'name',

    /*
     * Authenticatable model class
     */
    'authenticatable' => \App\Models\AuthObjects\User::class,


    /*
     * The name of the table where the comments are stored.
     */
    'table_name' => 'filament_comments',
];
