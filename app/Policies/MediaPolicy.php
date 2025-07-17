<?php

namespace App\Policies;

use App\Models\Media;
use App\Models\AuthObjects\User;
use Illuminate\Support\Str;

class MediaPolicy
{
    public function view(User $user, Media $media): bool
    {
        $model = $media->model;

        if (method_exists($model, 'canUserViewMedia')) {
            return $model->canUserViewMedia($user);
        }

        // Allow if user is admin
        return $user->can('is-admin') || $user->can('is-super-admin');
    }

    public function create(User $user, string $modelType, int $modelId): bool
    {
        $model = app($modelType)::find($modelId);

        if (! $model) {
            return false;
        }

        // Convert the class name to a hyphenated string
        $modelName = Str::kebab(class_basename($modelType));

        // Allow if user can update the related model
        return $user->can("update-{$modelName}", $model);
    }

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
