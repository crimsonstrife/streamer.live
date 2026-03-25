<?php

namespace Tests\Unit\AuthObjects;

use App\Models\AuthObjects\User;
use Mockery;
use Tests\TestCase;

class UserSystemLogAccessTest extends TestCase
{
    public function test_it_allows_users_with_the_dedicated_log_permission(): void
    {
        $user = Mockery::mock(User::class)->makePartial();
        $user->shouldReceive('can')->once()->with('view-system-logs')->andReturn(true);
        $user->shouldReceive('isAdmin')->never();
        $user->shouldReceive('isSuperAdmin')->never();

        $this->assertTrue($user->canViewSystemLogs());
    }

    public function test_it_allows_admins_without_the_dedicated_log_permission(): void
    {
        $user = Mockery::mock(User::class)->makePartial();
        $user->shouldReceive('can')->once()->with('view-system-logs')->andReturn(false);
        $user->shouldReceive('isAdmin')->once()->andReturn(true);
        $user->shouldReceive('isSuperAdmin')->never();

        $this->assertTrue($user->canViewSystemLogs());
    }

    public function test_it_denies_users_without_log_access(): void
    {
        $user = Mockery::mock(User::class)->makePartial();
        $user->shouldReceive('can')->once()->with('view-system-logs')->andReturn(false);
        $user->shouldReceive('isAdmin')->once()->andReturn(false);
        $user->shouldReceive('isSuperAdmin')->once()->andReturn(false);

        $this->assertFalse($user->canViewSystemLogs());
    }
}
