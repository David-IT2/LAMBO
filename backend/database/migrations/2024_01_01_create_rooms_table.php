<?php
// ─── database/migrations/2024_01_01_create_rooms_table.php ───────────────────
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 120)->unique();
            $table->enum('type', ['single', 'shared', 'bedsitter']);
            $table->decimal('price', 10, 2)->comment('Monthly rent KES');
            $table->string('size', 20)->nullable();
            $table->tinyInteger('occupancy')->default(1);
            $table->text('description')->nullable();
            $table->json('amenities')->nullable();
            $table->json('images')->nullable();
            $table->string('badge', 50)->nullable();
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
