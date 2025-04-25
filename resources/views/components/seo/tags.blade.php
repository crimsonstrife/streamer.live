@props(['page'])
<meta name="description" content="{{ $page->description ?? $description ?? setting('meta_description') }}">
<meta name="keywords" content="{{ $keywords ?? setting('meta_keywords') }}">
<meta name="author" content="{{ $author ?? setting('meta_author') }}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{{url()->current()}}"/>
<title>{{ $page->title ?? $title ?? setting('meta_title') ?? config('app.name', 'Streamer.live') }}</title>
<meta property='article:published_time' content='{{ $date ?? setting('meta_date') }}'>
<meta property='article:section' content='{{ $category ?? setting('meta_category') }}'>

<meta property="og:site_name" content="{{ setting('site_name') }}">
<meta property="og:type" content="{{ $type ?? setting('og_type') }}"/>
<meta property="og:locale" content="ar-eg"/>
<meta property="og:locale:alternate" content="en-us">
<meta property="og:title"
      content="{{ $page->title ?? $title ?? setting('meta_title') ?? config('app.name', 'Streamer.live') }}"/>
<meta property="og:description" content="{{ $page->description ?? $description ?? setting('meta_description') }}"/>
<meta property="og:image" content="{{ $image ?? setting('meta_image') }}"/>
<meta property="og:image:alt"
      content="{{ $page->title ?? $title ?? setting('meta_title') ?? config('app.name', 'Streamer.live') }}"/>
<meta property="og:url" content="{{url()->current()}}"/>

<meta name="twitter:card" content="summary">
<meta name="twitter:title"
      content="{{ $page->title ?? $title ?? setting('meta_title') ?? config('app.name', 'Streamer.live') }}">
<meta name="twitter:description" content="{{ $page->description ?? $description ?? setting('meta_description') }}">
<meta name="twitter:image" content="{{ $image ?? setting('meta_image') }}">


<script type="application/ld+json">{"@context":"https://schema.org","@type":"{{ $type ?? setting('og_type') }}
    ","name":"{{ $page->title ?? $title ?? setting('meta_title') ?? config('app.name', 'Streamer.live') }}"}
</script>
