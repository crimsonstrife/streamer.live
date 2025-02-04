@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>{{ $page->title }}</h1>
        <p>{{ $page->excerpt }}</p>
        <div>{!! $page->content !!}</div>
    </div>
@endsection
