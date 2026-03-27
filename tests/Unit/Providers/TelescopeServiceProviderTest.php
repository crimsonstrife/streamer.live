<?php

namespace Tests\Unit\Providers;

use App\Providers\TelescopeServiceProvider;
use Illuminate\Support\Facades\DB;
use PDOException;
use Tests\TestCase;

class TelescopeServiceProviderTest extends TestCase
{
    public function test_it_disables_telescope_when_the_storage_connection_is_unavailable(): void
    {
        config([
            'telescope.enabled' => true,
            'telescope.driver' => 'database',
            'telescope.storage.database.connection' => 'mysql',
        ]);

        DB::shouldReceive('connection')
            ->once()
            ->with('mysql')
            ->andReturnSelf();
        DB::shouldReceive('getPdo')
            ->once()
            ->andThrow(new PDOException('Operation not permitted'));

        (new TelescopeServiceProvider($this->app))->register();

        $this->assertFalse(config('telescope.enabled'));
    }
}
