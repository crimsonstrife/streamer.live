@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>{{ $post->title }}</h1>
        <p>Category: <a href="{{ url('/' . $post->category->slug) }}">{{ $post->category->name }}</a></p>
        <p>{{ $post->excerpt }}</p>
        <div>{!! $post->content !!}</div>
    </div>
@endsection
