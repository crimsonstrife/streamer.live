@php
    $user = filament()->auth()->user();
@endphp

<x-filament-widgets::widget class="fi-account-widget">
    <x-filament::section>
        <div class="flex items-center gap-x-3">
            <x-filament-panels::avatar.user size="lg" :user="$user"/>

            <div class="flex-1">
                <h2 class="text-base font-semibold leading-6 text-gray-950 dark:text-white">
                    {{ __('filament-panels::widgets/account-widget.welcome', ['app' => config('app.name')]) }}
                </h2>

                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ filament()->getUserName($user) }}
                </p>
            </div>

            <form
                action="{{ filament()->getLogoutUrl() }}"
                method="post"
                class="my-auto"
            >
                @csrf

                <x-filament::button
                    color="gray"
                    icon="fas-right-from-bracket"
                    icon-alias="panels::widgets.account.logout-button"
                    labeled-from="sm"
                    tag="button"
                    type="submit"
                >
                    {{ __('filament-panels::widgets/account-widget.actions.logout.label') }}
                </x-filament::button>
            </form>
        </div>

        @if ($user->onboarding()->inProgress())
            <x-filament::card class="mt-4 bg-gray-50 dark:bg-gray-800">
                <h3 class="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                    👋 Let's get you started
                </h3>

                <ul class="space-y-2">
                    @foreach ($user->onboarding()->steps as $step)
                        <li class="flex items-start gap-2">
                            @if ($step->complete())
                                <x-far-square-check class="text-success mt-1" height="2rem"/>
                                <div class="flex-1 text-sm text-gray-500 line-through">
                                    <span class="font-semibold">{{ $loop->iteration }}. {{ $step->title }}</span>
                                </div>
                            @else
                                <x-far-square class="text-gray-400 mt-1" height="2rem"/>
                                <div class="flex-1 text-sm text-gray-800 dark:text-gray-200">
                                    <span>
                                        <div class="font-semibold">{{ $loop->iteration }}. {{ $step->title }}</div>
                                    @if ($step->cta)
                                            <a
                                                href="{{ $step->link }}"
                                                class="text-primary-600 hover:underline text-sm"
                                            >
                                            {{ $step->cta }}
                                        </a>
                                        @endif
                                    </span>
                                </div>
                            @endif
                        </li>
                    @endforeach
                </ul>
            </x-filament::card>
        @endif
    </x-filament::section>
</x-filament-widgets::widget>
