<?php

namespace Tests\Feature;

use App\Models\AuthObjects\User;
use Faker\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Livewire\Profile\UpdateProfileInformationForm;
use Livewire\Livewire;
use Tests\TestCase;

class ProfileInformationTest extends TestCase
{
    use RefreshDatabase;

    public function test_current_profile_information_is_available(): void
    {
        $this->actingAs($user = User::factory()->create());

        $component = Livewire::test(UpdateProfileInformationForm::class);

        $this->assertEquals($user->username, $component->state['username']);
        $this->assertEquals($user->email, $component->state['email']);
    }

    public function test_profile_information_can_be_updated(): void
    {
        $this->actingAs($user = User::factory()->create());

        Livewire::test(UpdateProfileInformationForm::class)
            ->set('state', ['username' => 'TestName', 'email' => 'test@example.com'])
            ->call('updateProfileInformation');

        $this->assertEquals('TestName', $user->fresh()->username);
        $this->assertEquals('test@example.com', $user->fresh()->email);
    }
}
