<?php

namespace App\Policies;

use App\Models\Media;
use App\Models\AuthObjects\User;
use Illuminate\Support\Str;

class MediaPolicy
{
    /**
     * Determines if the given user is authorized to view the specified media.
     *
     * This method checks if the associated model of the media has a specific method
     * to determine viewing permissions. If the method exists, it delegates the
     * permission check to that method. Otherwise, it grants permission if the user
     * possesses admin or super-admin roles.
     *
     * @param User $user The user attempting to view the media.
     * @param Media $media The media the user is attempting to view.
     * @return bool True if the user is authorized to view the media, false otherwise.
     */
    public function view(User $user, Media $media): bool
    {
        $model = $media->model;

        if (method_exists($model, 'canUserViewMedia')) {
            return $model->canUserViewMedia($user);
        }

        // Allow if user is admin
        return $user->can('is-admin') || $user->can('is-super-admin');
    }

    /**
     * Determine if the user is authorized to create media associated with a model or globally.
     *
     * This function checks if the user has the permission to create media generally or specific
     * to a particular model. If no model type and ID are provided, the check defaults to
     * general permissions. When a model is provided, it verifies the user's ability to perform
     * actions on that specific model.
     *
     * @param User $user The authorized user attempting to perform the action.
     * @param string|null $modelType The fully qualified class name of the model or null if the operation is not model-specific.
     * @param int|null $modelId The ID of the specific model instance or null if the operation is not model-specific.
     *
     * @return bool Returns true if the user is authorized to create media, otherwise false.
     */
    public function create(User $user, string $modelType = null, int $modelId = null): bool
    {
        if ($modelType === null && $modelId === null) {
            // This media isn't model specific, so just check permissions
            return $user->can("create-media") || ($user->can('is-admin') || $user->can('is-super-admin'));
        }

        $model = app($modelType)::find($modelId);

        if (! $model) {
            return false;
        }

        // Convert the class name to a hyphenated string
        $modelName = Str::kebab(class_basename($modelType));

        // Allow if user can update the related model, create media, or is an admin or super-admin
        return ($user->can("update-{$modelName}", $model) && $user->can("create-media")) || $user->can('is-admin') || $user->can('is-super-admin');
    }

    /**
     * Determines if the given user is authorized to delete the specified media.
     *
     * This method checks if the associated model of the media has a specific method
     * to determine deletion permissions. If the method exists, it delegates the
     * permission check to that method. Otherwise, it grants permission if the user
     * possesses admin or super-admin roles.
     *
     * @param User $user The user attempting to delete the media.
     * @param Media $media The media the user is attempting to delete.
     * @return bool True if the user is authorized to delete the media, false otherwise.
     */
    public function delete(User $user, Media $media): bool
    {
        $model = $media->model;

        if (method_exists($model, 'canUserDeleteMedia')) {
            return $model->canUserDeleteMedia($user);
        }

        // Allow if user is admin
        return $user->can('is-admin') || $user->can('is-super-admin');
    }
}
