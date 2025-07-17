<x-filament-widgets::widget>
    <x-filament::section>
        @if (auth()->user()->onboarding()->inProgress())
            <div>
                @foreach (auth()->user()->onboarding()->steps as $step)
                    <span>
                @if($step->complete())
                            <x-far-square-check height="1rem"/>
                            <s>{{ $loop->iteration }}. {{ $step->title }}</s>
                        @else
                            <x-far-square height="1rem"/>
                            {{ $loop->iteration }}. {{ $step->title }}
                        @endif
            </span>

                    <a href="{{ $step->link }}" {{ $step->complete() ? 'disabled' : '' }}>
                        {{ $step->cta }}
                    </a>
                @endforeach
            </div>
        @endif
    </x-filament::section>
</x-filament-widgets::widget>
