<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Admin user ────────────────────────────────────────────────────────
        DB::table('users')->insertOrIgnore([
            'name'       => 'Admin',
            'email'      => 'admin@consolatahostel.co.ke',
            'phone'      => '+254700000000',
            'password'   => Hash::make('admin1234'),
            'role'       => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // ── Demo student ──────────────────────────────────────────────────────
        DB::table('users')->insertOrIgnore([
            'name'       => 'Demo Student',
            'email'      => 'student@demo.com',
            'phone'      => '+254712345678',
            'password'   => Hash::make('password'),
            'role'       => 'student',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // ── Rooms ─────────────────────────────────────────────────────────────
        $rooms = [
            [
                'name'         => 'Single Ensuite',
                'slug'         => 'single-ensuite',
                'type'         => 'single',
                'price'        => 12000.00,
                'size'         => '18 m²',
                'occupancy'    => 1,
                'badge'        => 'Most Popular',
                'is_available' => 1,
                'description'  => 'A fully furnished private room with a dedicated en-suite bathroom. Perfect for students who value privacy and a quiet study environment. All utilities included.',
                'amenities'    => json_encode([
                    'En-suite bathroom', 'Study desk & chair', 'Wardrobe & storage',
                    'Free high-speed WiFi', 'Smart TV', 'Air conditioning', 'Daily housekeeping',
                ]),
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
                    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200',
                    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'         => 'Shared Double',
                'slug'         => 'shared-double',
                'type'         => 'shared',
                'price'        => 7500.00,
                'size'         => '22 m²',
                'occupancy'    => 2,
                'badge'        => 'Best Value',
                'is_available' => 1,
                'description'  => 'A spacious twin room with dedicated study space and personal wardrobe for each occupant. Shared bathroom on the same floor.',
                'amenities'    => json_encode([
                    'Individual study desks', 'Personal wardrobes', 'Shared floor bathroom',
                    'Free high-speed WiFi', 'Reading lamp', 'Mini fridge', 'Common area access',
                ]),
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'         => 'Bedsitter Studio',
                'slug'         => 'bedsitter',
                'type'         => 'bedsitter',
                'price'        => 18000.00,
                'size'         => '32 m²',
                'occupancy'    => 1,
                'badge'        => 'Premium',
                'is_available' => 0,
                'description'  => 'A self-contained studio apartment combining sleeping, living, and kitchenette spaces. Ideal for postgraduate students.',
                'amenities'    => json_encode([
                    'Private kitchenette', 'En-suite bathroom', 'Living area with sofa',
                    'Full-size wardrobe', 'Free high-speed WiFi', 'Smart TV & AC', 'In-unit laundry point',
                ]),
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
                    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($rooms as $room) {
            DB::table('rooms')->insertOrIgnore($room);
        }

        $this->command->info('✅ Seeding complete: admin, demo student, and 3 rooms created.');
    }
}
