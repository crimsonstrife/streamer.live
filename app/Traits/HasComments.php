<?php

namespace App\Traits;

use App\Abstracts\AbstractQueries;
use App\Enums\Sort;
use App\Exceptions\CommentLimitExceededException;
use App\Facades\SecureGuestMode;
use App\Models\BlogObjects\Comment;
use App\Utilities\Helpers;
use App\Utilities\ModelResolver;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Throwable;

/**
 * @mixin Model
 */
trait HasComments
{
    /** @return MorphMany<Comment> */
    public function comments(): MorphMany
    {
        return $this->morphMany(ModelResolver::commentClass(), 'commented_on');
    }

    public function authCheck(): bool
    {
        return Auth::guard($this->getAuthGuard())->check();
    }

    public function getAuthGuard(): string
    {
        return SecureGuestMode::enabled() ? 'guest' : Auth::getDefaultDriver();
    }

    /**
     * @throws Throwable
     */
    public function canCreateComment(?Authenticatable $user = null): bool
    {
        if (method_exists($this, 'commentCanCreate')) {
            return $this->commentCanCreate($user);
        }

        throw_if(
            $this->limitExceeded($user),
            CommentLimitExceededException::make($this, $this->getCommentLimit())
        );

        if ($this->guestModeEnabled()) {
            return true;
        }

        throw_unless(
            $this->authCheck(),
            new AuthenticationException(guards: [$this->getAuthGuard()], redirectTo: route('login'))
        );

        return Gate::allows('create-comment');
    }

    public function guestModeEnabled(): bool
    {
        if (property_exists($this, 'guestMode')) {
            return $this->guestMode;
        }

        if (config('comments.guest_mode.enabled')) {
            return true;
        }

        return false;
    }

    public function limitExceeded(?Authenticatable $user = null): bool
    {
        $limit = $this->getCommentLimit();

        if (is_null($limit)) {
            return false;
        }

        if (is_null($user)) {
            return $this->checkLimitForGuest($limit);
        }

        return $this->checkLimitForAuthUser($user, $limit);
    }

    public function paginationEnabled(): bool
    {
        return config('comments.pagination.enabled', true);
    }

    public function checkLimitForGuest(int $limit): bool
    {
        return app(AbstractQueries::class)->guestCommentCount($this) >= $limit;
    }

    public function checkLimitForAuthUser(Authenticatable $user, int $limit): bool
    {
        return app(AbstractQueries::class)->userCommentCount($user, $this) >= $limit;
    }

    public function getCommentLimit(): ?int
    {
        $limit = config('comments.limit');

        if (property_exists($this, 'commentLimit')) {
            $limit = $this->commentLimit;
        }

        return $limit;
    }

    public function approvalRequired(): bool
    {
        if (property_exists($this, 'approvalRequired')) {
            return $this->approvalRequired;
        }

        return config('comments.approval_required', true);
    }

    /**
     * @throws Throwable
     */
    public function getAuthUser(): ?Authenticatable
    {
        if (! $this->authCheck()) {
            return null;
        }

        $user = Auth::guard($this->getAuthGuard())->user();

        Helpers::checkCommenterModelValidity($user);

        return $user;
    }

    public function getCommentsSortOrder(): Sort
    {
        $order = Sort::TOP;

        if (! empty($defaultOrder = config('comments.default_sort'))) {
            $order = $defaultOrder;
        }

        if (! empty($this->commmentsSortOrder)) {
            $order = $this->commmentsSortOrder;
        }

        return $order;
    }

    public function getRepliesSortOrder(): Sort
    {
        $order = Sort::NEWEST();

        if (! empty($this->repliesSortOrder)) {
            $order = $this->repliesSortOrder;
        }

        return $order;
    }

    public function canEditComment(Comment $comment): bool
    {
        if (method_exists($this, 'commentCanEdit')) {
            return $this->commentCanEdit($comment);
        }

        return Gate::allows('update-comment', [$comment, $this->guestModeEnabled()]);
    }

    public function canDeleteComment(Comment $comment): bool
    {
        if (method_exists($this, 'commentCanEdit')) {
            return $this->commentCanEdit($comment);
        }

        return Gate::allows('delete-comment', [$comment, $this->guestModeEnabled()]);
    }
}
