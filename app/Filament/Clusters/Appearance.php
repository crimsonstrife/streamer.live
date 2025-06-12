<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class Appearance extends Cluster
{
    protected static ?string $navigationIcon = 'fas-palette';

    protected static ?string $navigationLabel = 'Site Look & Feel';

    protected static ?string $navigationGroup = 'Settings';
}
