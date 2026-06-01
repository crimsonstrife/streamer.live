<x-app-layout>
    <style>
        .gift-opening {
            min-height: 68vh;
            display: grid;
            place-items: center;
        }

        .gift-opening__panel {
            width: min(100%, 560px);
            text-align: center;
        }

        .gift-opening__stage {
            position: relative;
            width: 160px;
            height: 150px;
            margin: 0 auto 1.5rem;
        }

        .gift-opening__box,
        .gift-opening__lid {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            background: #e63946;
            box-shadow: 0 16px 32px rgba(20, 24, 33, 0.18);
        }

        .gift-opening__box {
            bottom: 0;
            width: 126px;
            height: 96px;
            border-radius: 8px;
            overflow: hidden;
        }

        .gift-opening__lid {
            top: 28px;
            width: 144px;
            height: 34px;
            border-radius: 8px 8px 5px 5px;
            animation: gift-lid 1.6s ease-in-out infinite;
            transform-origin: 70% 100%;
        }

        .gift-opening__box::before,
        .gift-opening__lid::before {
            content: "";
            position: absolute;
            inset: 0 auto 0 50%;
            width: 24px;
            transform: translateX(-50%);
            background: #fff3b0;
        }

        .gift-opening__box::after {
            content: "";
            position: absolute;
            inset: 38px 0 auto;
            height: 22px;
            background: #fff3b0;
        }

        .gift-opening__spark {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: #2a9d8f;
            opacity: 0;
            animation: gift-spark 1.6s ease-out infinite;
        }

        .gift-opening__spark:nth-child(3) {
            top: 14px;
            left: 36px;
        }

        .gift-opening__spark:nth-child(4) {
            top: 0;
            right: 42px;
            background: #f4a261;
            animation-delay: 0.16s;
        }

        .gift-opening__spark:nth-child(5) {
            top: 46px;
            left: 16px;
            background: #457b9d;
            animation-delay: 0.28s;
        }

        .gift-opening__product {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.85rem;
            margin: 1rem auto 1.5rem;
            color: var(--bs-body-color);
        }

        .gift-opening__product img {
            width: 68px;
            height: 68px;
            border-radius: 8px;
            object-fit: cover;
            border: 1px solid rgba(0, 0, 0, 0.08);
        }

        @keyframes gift-lid {
            0%, 100% {
                transform: translateX(-50%) rotate(0deg) translateY(0);
            }
            48%, 62% {
                transform: translateX(-46%) rotate(8deg) translateY(-18px);
            }
        }

        @keyframes gift-spark {
            0% {
                transform: translateY(32px) scale(0.6);
                opacity: 0;
            }
            35% {
                opacity: 1;
            }
            100% {
                transform: translateY(-24px) scale(1.1);
                opacity: 0;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .gift-opening__lid,
            .gift-opening__spark {
                animation: none;
            }
        }
    </style>

    <section class="gift-opening">
        <div class="gift-opening__panel">
            <div class="gift-opening__stage" aria-hidden="true">
                <div class="gift-opening__box"></div>
                <div class="gift-opening__lid"></div>
                <span class="gift-opening__spark"></span>
                <span class="gift-opening__spark"></span>
                <span class="gift-opening__spark"></span>
            </div>

            <h1 class="h2 fw-semibold mb-3">Opening your gift</h1>

            @if ($product)
                <div class="gift-opening__product">
                    <img src="{{ $product->primary_image_url }}" alt="{{ $product->name }}">
                    <div class="text-start">
                        <div class="fw-semibold">{{ $product->name }}</div>
                        <div class="text-muted small">You will claim this gift on Fourthwall.</div>
                    </div>
                </div>
            @else
                <p class="text-muted mb-4">You will claim this gift on Fourthwall.</p>
            @endif

            <a href="{{ $redirectUrl }}" class="btn btn-primary btn-lg">
                Continue to claim gift
            </a>
        </div>
    </section>

    <script>
        window.setTimeout(function () {
            window.location.assign(@json($redirectUrl));
        }, @json($redirectDelay));
    </script>
</x-app-layout>
