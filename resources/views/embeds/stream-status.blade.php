@php
    $width = $compact ? 360 : 520;
    $height = 64;

    $statusText = $isLive ? 'LIVE' : 'OFFLINE';
    $statusColor = $isLive ? "#{$theme['accent']}" : "#{$theme['offline']}";

    $line2Parts = [];

    if ($isLive) {
        if ($showCategory && $game) {
            $line2Parts[] = $game;
        }

        if ($viewers !== null) {
            $line2Parts[] = number_format((int) $viewers) . ' viewers';
        }

        if ($duration) {
            $line2Parts[] = "for {$duration}";
        }
    } else {
        if ($showLastLive && $lastLive) {
            $line2Parts[] = "Last live {$lastLive}";
        } else {
            $line2Parts[] = 'Not currently streaming';
        }

        if ($showCategory && $game) {
            $line2Parts[] = $game;
        }
    }

    $line2 = collect($line2Parts)->filter()->join(' • ');

    $title = "{$username} stream status";
    $desc = $isLive
        ? "{$username} is live. {$line2}"
        : "{$username} is offline. {$line2}";
@endphp
<svg xmlns="http://www.w3.org/2000/svg"
     width="{{ $width }}"
     height="{{ $height }}"
     viewBox="0 0 {{ $width }} {{ $height }}"
     role="img"
     aria-labelledby="title desc">
    <title id="title">{{ $title }}</title>
    <desc id="desc">{{ $desc }}</desc>

    <style>
        .badge-text {
            font-family: Arial, Helvetica, sans-serif;
        }

        @keyframes pulse-ring {
            0%   { opacity: 0.55; transform: scale(1); }
            70%  { opacity: 0;    transform: scale(1.9); }
            100% { opacity: 0;    transform: scale(1.9); }
        }

        .pulse-ring {
            transform-box: fill-box;
            transform-origin: center;
            animation: pulse-ring 1.6s ease-out infinite;
        }
    </style>

    <rect x="0.5" y="0.5"
          width="{{ $width - 1 }}"
          height="{{ $height - 1 }}"
          rx="12"
          fill="#{{ $theme['bg'] }}"
          stroke="#{{ $theme['border'] }}" />

    <a href="{{ $twitchUrl }}" target="_blank" rel="noopener noreferrer">
        @if($isLive)
            <circle class="pulse-ring" cx="24" cy="32" r="7" fill="{{ $statusColor }}" />
        @endif

        <circle cx="24" cy="32" r="7" fill="{{ $statusColor }}">
            @if($isLive)
                <animate attributeName="opacity" values="1;0.85;1" dur="1.6s" repeatCount="indefinite" />
            @endif
        </circle>

        <text x="40" y="26"
              class="badge-text"
              fill="#{{ $theme['fg'] }}"
              font-size="16"
              font-weight="700">
            {{ strtoupper($username) }} • {{ $statusText }}
        </text>

        <text x="40" y="45"
              class="badge-text"
              fill="#{{ $theme['muted'] }}"
              font-size="13">
            {{ $line2 }}
        </text>
    </a>
</svg>
