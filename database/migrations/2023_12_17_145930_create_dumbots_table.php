<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dumbots', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->json('draft');
            $table->json('schema');
            $table->timestamp('published_at');
            $table->timestamps();
        });

        Schema::create('dumbots_instance', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->string('dumbot_id');
            $table->foreign('dumbot_id')->references('id')->on('dumbots');
            $table->string('token')->unique();
            $table->json('progress');
            $table->boolean('finished');
            $table->timestamp('finished_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dumbots');
        Schema::dropIfExists('dumbots_instance');
    }
};
