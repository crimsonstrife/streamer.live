<?php

namespace App\Filament\Resources\FolderResource\Pages;

use App\Filament\Resources\FolderResource;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ManageRecords;
use Illuminate\Validation\ValidationException;
use App\Models\Folder;
use App\Models\Media;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFolders extends ManageRecords
{
    protected static string $resource = FolderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function mount(): void
    {
        session()->forget('folder_id');
        session()->forget('folder_password');
    }

    public function folderAction(?Folder $item = null)
    {
        return Actions\Action::make('folderAction')
            ->requiresConfirmation(function (array $arguments) {
                if ($arguments['record']['is_protected']) {
                    return true;
                } else {
                    return false;
                }
            })
            ->form(function (array $arguments) {
                if ($arguments['record']['is_protected']) {
                    return [
                        TextInput::make('password')
                            ->password()
                            ->revealable()
                            ->required()
                            ->maxLength(255),
                    ];
                } else {
                    return null;
                }
            })
            ->action(function (array $arguments, array $data) {
                if ($arguments['record']['is_protected']) {
                    if ($arguments['record']['password'] != $data['password']) {
                        Notification::make()
                            ->title('Password is incorrect')
                            ->danger()
                            ->send();

                        return ;
                    } else {
                        session()->put('folder_password', $data['password']);
                    }
                }
                if (!$arguments['record']['model_type']) {
                    if (filament()->getTenant()) {
                        return redirect()->to(url(filament()->getCurrentPanel()->getId() .'/'. filament()->getTenant()->id . '/media?folder_id='.$arguments['record']['id']));
                    } else {
                        return redirect()->route('filament.'.filament()->getCurrentPanel()->getId().'.resources.media.index', ['folder_id' => $arguments['record']['id']]);
                    }
                }
                if (!$arguments['record']['model_id'] && !$arguments['record']['collection']) {
                    if (filament()->getTenant()) {
                        return redirect()->to(url(filament()->getCurrentPanel()->getId() .'/'. filament()->getTenant()->id . '/folders?model_type='.$arguments['record']['model_type']));
                    } else {
                        return redirect()->route('filament.'.filament()->getCurrentPanel()->getId().'.resources.folders.index', ['model_type' => $arguments['record']['model_type']]);
                    }
                } elseif (!$arguments['record']['model_id']) {
                    if (filament()->getTenant()) {
                        return redirect()->to(url(filament()->getCurrentPanel()->getId() .'/'. filament()->getTenant()->id . '/folders?model_type='.$arguments['record']['model_type'].'&collection='.$arguments['record']['collection']));
                    } else {
                        return redirect()->route('filament.'.filament()->getCurrentPanel()->getId().'.resources.folders.index', ['model_type' => $arguments['record']['model_type'], 'collection' => $arguments['record']['collection']]);
                    }
                } else {
                    if (filament()->getTenant()) {
                        return redirect()->to(url(filament()->getCurrentPanel()->getId() .'/'. filament()->getTenant()->id . '/media?folder_id='.$arguments['record']['id']));
                    } else {
                        return redirect()->route('filament.'.filament()->getCurrentPanel()->getId().'.resources.media.index', ['folder_id' => $arguments['record']['id']]);
                    }
                }
            })
            ->view('filament-media-manager::pages.folder-action', ['item' => $item]);
    }
}
