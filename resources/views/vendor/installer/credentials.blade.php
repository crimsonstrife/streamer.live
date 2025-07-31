@extends('vendor.installer.layouts.master')

@section('title','Admin Credentials')

@section('container')
    <h2>Set up your first admin user</h2>

    <form id="cred-form" method="POST" action="{{ route('LaravelInstaller::credentialsSave') }}">
        @csrf

        <div class="form-group">
            <label>First Name</label>
            <input type="text" name="ADMIN_FIRSTNAME" class="form-control"
                   value="{{ old('ADMIN_FIRSTNAME') }}">
            <label>Last Name</label>
            <input type="text" name="ADMIN_LASTNAME" class="form-control"
                   value="{{ old('ADMIN_LASTNAME') }}">
        </div>

        <div class="form-group">
            <label>Username</label>
            <input type="text" name="ADMIN_USERNAME" class="form-control"
                   value="{{ old('ADMIN_USERNAME') }}">
            <label>Email</label>
            <input type="email" name="ADMIN_EMAIL" class="form-control"
                   value="{{ old('ADMIN_EMAIL') }}">
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" name="ADMIN_PASSWORD" class="form-control">
            <small class="text-muted">Min. 8 chars</small>
        </div>

        <div class="form-group">
            <label>
                <input type="checkbox" name="skip" value="1">
                Auto‐generate credentials for me
            </label>
        </div>

        <button type="submit" class="button">{{ __('installer_messages.next') }}</button>
    </form>
@endsection
