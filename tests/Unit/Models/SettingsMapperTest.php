<?php

namespace Tests\Unit\Models;

use App\Models\SettingsMapper;
use App\Utilities\SchemaCache;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use PDOException;
use Tests\TestCase;

class SettingsMapperTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // SchemaCache is process-wide; flush between tests so an earlier
        // suite doesn't poison the answer for 'settings'.
        SchemaCache::flush();
    }

    public function test_it_returns_no_properties_when_the_settings_table_probe_fails(): void
    {
        Log::spy();
        Schema::shouldReceive('hasTable')
            ->once()
            ->with('settings')
            ->andThrow(new PDOException('Operation not permitted'));

        $properties = (new SettingsMapper())->fetchProperties('unused-settings-class', new Collection(['enabled']));

        $this->assertTrue($properties->isEmpty());
        Log::shouldNotHaveReceived('warning', ['Operation not permitted']);
    }

    public function test_it_caches_the_settings_table_availability_across_calls(): void
    {
        // SchemaCache memoizes hasTable() to keep boot-time code paths off
        // information_schema.tables, which on managed MySQL contributes to
        // connection exhaustion. A second fetch must reuse the answer.
        Schema::shouldReceive('hasTable')
            ->once()
            ->with('settings')
            ->andReturn(false);

        $mapper = new SettingsMapper();

        $this->assertTrue($mapper->fetchProperties('unused-settings-class', new Collection(['enabled']))->isEmpty());
        $this->assertTrue($mapper->fetchProperties('unused-settings-class', new Collection(['enabled']))->isEmpty());
    }
}
