<?php

namespace App\Traits;

trait HasOwner
{
    public function ownerName(bool $isAuthMode): string
    {
        if ($isAuthMode) {
            $name = auth()->user()->name;

            return $name;
        }

        $name = $this->{$this->userRelationshipName}->name;

        if (empty($name)) {
            $name = config('comments.replace_null_name', '?');
        }

        return $name;
    }
}
