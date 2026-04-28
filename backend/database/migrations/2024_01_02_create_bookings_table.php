<?php
// ─── database/migrations/2024_01_02_create_bookings_table.php ─────────────────
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_id')->constrained()->restrictOnDelete();
            $table->date('move_in_date');
            $table->tinyInteger('duration_months')->default(3);
            $table->decimal('total_amount', 12, 2);
            $table->decimal('deposit_amount', 12, 2);
            $table->enum('payment_method', ['mpesa', 'bank', 'cash'])->default('mpesa');
            $table->string('mpesa_number', 20)->nullable();
            $table->string('mpesa_receipt', 20)->nullable();
            $table->enum('status', ['pending', 'confirmed', 'waitlist', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
