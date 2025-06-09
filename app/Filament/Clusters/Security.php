<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class Security extends Cluster
{
    protected static ?string $navigationIcon = 'fas-shield';
    protected static ?string $navigationLabel = 'Site Security';
    protected static ?string $navigationGroup = 'Settings';
}
