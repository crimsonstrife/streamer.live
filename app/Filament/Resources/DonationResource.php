<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DonationResource\Pages;
use App\Models\SponsorObjects\Donation;
use App\Models\SponsorObjects\Goal;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;

    protected static ?string $slug = 'sponsor/donations';

    protected static ?string $recordTitleAttribute = 'id';

    protected static ?string $navigationGroup = 'Sponsor';

    protected static ?string $navigationIcon = 'fas-hand-holding-heart';

    protected static ?int $navigationSort = 1;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Donation')
                    ->schema([
                        Infolists\Components\TextEntry::make('goal.title')->label('Goal'),
                        Infolists\Components\TextEntry::make('amount')
                            ->formatStateUsing(fn ($record) => $record->amount?->symbolFormatted()),
                        Infolists\Components\TextEntry::make('status')->badge(),
                        Infolists\Components\TextEntry::make('paid_at')->dateTime(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Donor')
                    ->schema([
                        Infolists\Components\TextEntry::make('donor_name')->label('Name'),
                        Infolists\Components\TextEntry::make('donor_email')->label('Email'),
                        Infolists\Components\IconEntry::make('is_anonymous')->label('Anonymous')->boolean(),
                        Infolists\Components\TextEntry::make('user.name')->label('User account'),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Message')
                    ->schema([
                        Infolists\Components\TextEntry::make('message')->columnSpanFull(),
                        Infolists\Components\IconEntry::make('is_message_approved')
                            ->label('Approved for public display')
                            ->boolean(),
                    ])
                    ->visible(fn ($record) => ! empty($record->message)),

                Infolists\Components\Section::make('Stripe')
                    ->schema([
                        Infolists\Components\TextEntry::make('stripe_checkout_session_id')->label('Checkout Session'),
                        Infolists\Components\TextEntry::make('stripe_payment_intent_id')->label('Payment Intent'),
                        Infolists\Components\TextEntry::make('stripe_charge_id')->label('Charge'),
                    ])
                    ->collapsed()
                    ->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('goal.title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('display_name')
                    ->label('Donor')
                    ->getStateUsing(fn (Donation $record) => $record->displayName()),

                Tables\Columns\TextColumn::make('amount')
                    ->formatStateUsing(fn ($record) => $record->amount?->symbolFormatted())
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'success' => 'succeeded',
                        'warning' => 'pending',
                        'danger' => ['failed', 'refunded'],
                    ]),

                Tables\Columns\TextColumn::make('message')
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->message)
                    ->placeholder('—'),

                Tables\Columns\IconColumn::make('is_message_approved')
                    ->label('Msg OK')
                    ->boolean(),

                Tables\Columns\IconColumn::make('is_anonymous')
                    ->label('Anon')
                    ->boolean(),

                Tables\Columns\TextColumn::make('paid_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('paid_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('goal_id')
                    ->label('Goal')
                    ->options(fn () => Goal::query()->orderBy('title')->pluck('title', 'id')),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'succeeded' => 'Succeeded',
                        'failed' => 'Failed',
                        'refunded' => 'Refunded',
                    ]),
                Tables\Filters\Filter::make('has_message')
                    ->query(fn ($query) => $query->whereNotNull('message'))
                    ->label('Has message'),
                Tables\Filters\Filter::make('pending_message_review')
                    ->query(fn ($query) => $query->whereNotNull('message')->where('is_message_approved', false))
                    ->label('Pending message review'),
                Tables\Filters\TernaryFilter::make('is_anonymous')
                    ->label('Anonymous'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\Action::make('approveMessage')
                    ->label('Approve message')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(fn (Donation $record) => ! empty($record->message) && ! $record->is_message_approved)
                    ->action(fn (Donation $record) => $record->update(['is_message_approved' => true])),
                Tables\Actions\Action::make('hideMessage')
                    ->label('Hide message')
                    ->icon('heroicon-o-eye-slash')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->visible(fn (Donation $record) => ! empty($record->message) && $record->is_message_approved)
                    ->action(fn (Donation $record) => $record->update(['is_message_approved' => false])),
                Tables\Actions\Action::make('refund')
                    ->label('Refund')
                    ->icon('heroicon-o-arrow-uturn-left')
                    ->color('danger')
                    ->visible(fn () => false),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDonations::route('/'),
            'view' => Pages\ViewDonation::route('/{record}'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['donor_name', 'donor_email', 'stripe_checkout_session_id', 'stripe_payment_intent_id'];
    }
}
