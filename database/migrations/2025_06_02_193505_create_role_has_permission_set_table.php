<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('role_has_permission_set', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permission_set_id')->constrained('permission_sets', 'id')->onDelete('cascade');
            $table->foreignId('role_id')->constrained('roles', 'id')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_has_permission_set');
    }
};
