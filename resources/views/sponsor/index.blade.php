<x-app-layout>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="h3 mb-1">Sponsor a Goal</h1>
            <p class="text-muted mb-0">Pick a goal and help us hit the target.</p>
        </div>
    </div>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @elseif(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    @if($goals->isEmpty())
        <div class="alert alert-info">
            There are no active goals right now. Check back soon!
        </div>
    @else
        <div class="row g-4">
            @foreach($goals as $goal)
                <div class="col-md-6 col-lg-4">
                    <div class="card shadow-sm h-100">
                        @if($bannerUrl = $goal->banner_url)
                            <a href="{{ route('sponsor.show', $goal->slug) }}">
                                <img src="{{ $bannerUrl }}"
                                     alt="{{ $goal->title }}"
                                     class="card-img-top"
                                     style="object-fit:cover;aspect-ratio:16/9;">
                            </a>
                        @endif
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">
                                <a href="{{ route('sponsor.show', $goal->slug) }}" class="text-decoration-none">
                                    {{ $goal->title }}
                                </a>
                            </h5>

                            @if($goal->summary)
                                <p class="card-text text-muted small">{{ $goal->summary }}</p>
                            @endif

                            <div class="mt-auto">
                                @include('sponsor.partials.progress', ['goal' => $goal])

                                <a href="{{ route('sponsor.show', $goal->slug) }}"
                                   class="btn btn-primary w-100 mt-3">
                                    Sponsor this goal
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="mt-4 d-flex justify-content-center">
            {{ $goals->links() }}
        </div>
    @endif
</x-app-layout>
