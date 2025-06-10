<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class Settings extends Cluster
{
    protected static ?string $navigationIcon = 'fas-gear';

    protected static ?string $navigationLabel = 'Site Settings';

    protected static ?string $navigationGroup = 'Settings';
}
