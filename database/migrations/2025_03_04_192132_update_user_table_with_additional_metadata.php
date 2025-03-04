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
        // Add birthdate to the users table, birthdate should only be used to determine age for content restrictions and coppa compliance
        Schema::table('users', function (Blueprint $table) {
            $table->date('birthdate')->after('email_verified_at'); // Add birthdate column after email_verified_at column
        });

        // Add gender/pronouns to the users table, should be an optional enum field
        Schema::table('users', function (Blueprint $table) {
            $table->enum('pronouns', ['he/him', 'she/her', 'they/them', 'other/ask'])->nullable()->after('birthdate'); // Add pronouns column after birthdate column
        });

        // Add location to the users table, should be an optional string field. This should be a general location, not an exact address
        Schema::table('users', function (Blueprint $table) {
            $table->string('location')->nullable()->after('pronouns'); // Add location column after pronouns column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('birthdate'); // Drop birthdate column
            $table->dropColumn('pronouns'); // Drop pronouns column
            $table->dropColumn('location'); // Drop location column
        });
    }
};
