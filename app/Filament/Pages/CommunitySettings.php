<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\Settings;
use App\Models\SharedObjects\Category;
use App\Settings\CommunitySettings as CommunitySettingsValues;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class CommunitySettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'fas-users';

    protected static ?string $navigationLabel = 'Community Settings';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?string $cluster = Settings::class;

    protected static string $settings = CommunitySettingsValues::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('General')
                    ->schema([
                        Forms\Components\Toggle::make('enable_community')
                            ->label('Enable community threads')
                            ->helperText('When disabled, thread creation and replies are rejected; read-only pages still render.'),
                    ]),

                Forms\Components\Section::make('Moderation')
                    ->schema([
                        Forms\Components\Toggle::make('require_thread_approval')
                            ->label('Require mod approval for new threads')
                            ->helperText('New threads start in "pending" and appear only after a moderator approves.'),
                        Forms\Components\Toggle::make('require_reply_approval')
                            ->label('Require mod approval for replies')
                            ->helperText('New replies start in "pending". Off by default — most replies can auto-approve.'),
                    ])->columns(2),

                Forms\Components\Section::make('Rate Limiting')
                    ->schema([
                        Forms\Components\TextInput::make('rate_limit_threads_per_hour')
                            ->label('Max threads per user per hour')
                            ->numeric()->minValue(1)->maxValue(100)->required(),
                        Forms\Components\TextInput::make('rate_limit_replies_per_hour')
                            ->label('Max replies per user per hour')
                            ->numeric()->minValue(1)->maxValue(500)->required(),
                        Forms\Components\TextInput::make('min_account_age_days')
                            ->label('Minimum account age (days) before posting')
                            ->numeric()->minValue(0)->maxValue(365)->required()
                            ->helperText('0 = no minimum. Friction against drive-by spam accounts.'),
                    ])->columns(3),

                Forms\Components\Section::make('Defaults')
                    ->schema([
                        Forms\Components\Select::make('default_community_category_id')
                            ->label('Default community category')
                            ->helperText('Applied when a user submits a thread without selecting a category. Leave blank to require users to choose.')
                            ->options(fn () => Category::query()
                                ->where('type', 'community')
                                ->pluck('name', 'id')
                                ->all())
                            ->searchable()
                            ->nullable(),
                    ]),
            ]);
    }
}
