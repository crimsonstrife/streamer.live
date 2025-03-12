<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\ReactionType;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reactions', function (Blueprint $table) {
            $table->id();
            $table->morphs('owner'); // Who reacted
            $table->morphs('reactable'); // The model that was reacted to (e.g. Comment, Reply)
            $table->enum('type', ReactionType::getValues()); // The type of reaction (e.g. like, dislike)
            $table->integer('point_value')->default(1); // The value of the reaction (e.g. 1 for like, -1 for dislike)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};
