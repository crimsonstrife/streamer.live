@extends('vendor.installer.layouts.master')

@section('title', trans('installer_messages.final.title'))
@section('container')
    <p class="paragraph" style="text-align: center;">{{ session('message')['message'] }}</p>

    @if(! empty($email) && ! empty($password))
        <div class="credentials-box">
            <h3>Your Admin Account</h3>
            <p>You can now log in with:</p>
            <ul>
                <li><strong>Username:</strong> {{ $username }}</li>
                <li><strong>Email:</strong> {{ $email }}</li>
                <li><strong>Password:</strong> {{ $password }}</li>
            </ul>
            <p class="text-warning">
                If you didn't supply your own password, change this password immediately after logging in!
            </p>
        </div>
    @endif

    <div class="buttons">
        <a href="{{ url('/') }}" class="button">{{ trans('installer_messages.final.exit') }}</a>
    </div>
@stop
