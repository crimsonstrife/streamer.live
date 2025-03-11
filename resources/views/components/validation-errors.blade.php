@if ($errors->any())
    <div {{ $attributes->merge(['class' => 'alert alert-danger']) }} role="alert">
        <h5 class="alert-heading">{{ __('Whoops! Something went wrong.') }}</h5>
        <ul class="mb-0">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif