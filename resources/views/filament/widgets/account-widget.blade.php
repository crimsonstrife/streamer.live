@php
    $user = filament()->auth()->user();
    $onboarding = $user->onboarding();
    $steps = $onboarding->steps;
    $totalSteps = count($steps);
    $completedSteps = collect($steps)->filter(fn ($step) => $step->complete())->count();
    $progress = $totalSteps > 0 ? (int) (($completedSteps / $totalSteps) * 100) : 0;
    $dismissed = $user->hasDismissedOnboarding();
@endphp

<x-filament-widgets::widget class="fi-account-widget">
    <x-filament::section>
        {{-- Top User Info --}}
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
        {{-- Onboarding Section --}}
        @if (!$dismissed && $onboarding->inProgress())
            <x-filament::card class="mt-4 bg-gray-50 dark:bg-gray-800 relative">
                {{-- Progress Header --}}
                <div class="mb-2">
                    <h3 class="text-sm font-medium text-gray-800 dark:text-gray-200">
                        👋 Let's get you started
                    </h3>
                    <div class="mt-1 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded">
                        <div
                            class="h-2 bg-primary-600 rounded transition-all"
                            style="width: {{ $progress }}%;"
                        ></div>
                    </div>
                    <p class="text-xs mt-1 text-gray-500 dark:text-gray-400">
                        {{ $completedSteps }} of {{ $totalSteps }} steps completed
                    </p>
                </div>
                <br/>
                {{-- Steps --}}
                <ul class="space-y-3 mt-3">
                    @foreach ($steps as $step)
                        <li class="flex items-start gap-2">
                            @if ($step->complete())
                                <x-far-square-check class="text-success mt-1" height="1.5rem"/>
                                <div class="flex-1 text-sm text-gray-500 line-through">
                                    <span class="font-semibold">{{ $loop->iteration }}. {{ $step->title }}</span>
                                </div>
                            @else
                                <x-far-square class="text-gray-400 mt-1" height="1.5rem"/>
                                <div class="flex-1 text-sm text-gray-800 dark:text-gray-200">
                                    <div class="font-semibold">{{ $loop->iteration }}. {{ $step->title }}</div>
                                    @if ($step->cta)
                                        <a
                                            href="{{ $step->link }}"
                                            class="text-primary-600 hover:underline text-sm"
                                        >
                                            {{ $step->cta }}
                                        </a>
                                    @endif
                                </div>
                            @endif
                        </li>
                    @endforeach
                </ul>
                <br/>
                {{-- Dismiss button --}}
                <form method="post"
                      action="{{ route('onboarding.dismiss', ['panel' => filament()->getCurrentPanel()?->getId() ?? 'admin']) }}"
                      class="relative bottom-2 left-10">
                    @csrf
                    <button type="submit" class="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span><x-fas-xmark class="w-4 h-4"/> Dismiss</span>
                    </button>
                </form>
            </x-filament::card>
        @endif
    </x-filament::section>
</x-filament-widgets::widget>
