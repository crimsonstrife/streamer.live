@props(['align' => 'end'])
<div {{ $attributes->merge(['class' => 'dropdown']) }}>
    <button class="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-label="Toggle theme"
            aria-expanded="false">
        <i class="bi bi-circle-half" aria-hidden="true"></i>
        <span class="visually-hidden">Toggle theme</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-{{ $align }} shadow-sm">
        <li>
            <button type="button" class="dropdown-item" data-theme-value="light">
                <i class="bi bi-sun-fill me-2" aria-hidden="true"></i>Light
            </button>
        </li>
        <li>
            <button type="button" class="dropdown-item" data-theme-value="dark">
                <i class="bi bi-moon-stars-fill me-2" aria-hidden="true"></i>Dark
            </button>
        </li>
        <li>
            <button type="button" class="dropdown-item" data-theme-value="auto">
                <i class="bi bi-circle-half me-2" aria-hidden="true"></i>Auto
            </button>
        </li>
    </ul>
</div>
