<?php

namespace Tests\Unit\Models;

use App\Models\SettingsMapper;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use PDOException;
use Tests\TestCase;

class SettingsMapperTest extends TestCase
{
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
}
