<?php

use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Docent',
            'student_number' => null,
            'email' => 'hallo@email.nl',
            'password' => Hash::make('admin'),
            'role' => 2
        ]);

        User::create([
            'name' => 'Demo',
            'student_number' => '12345',
            'email' => 'demo@demo.nl',
            'password' => Hash::make('demo'),
            'role' => 1
        ]);

        User::create([
            'name' => 'Bert',
            'student_number' => '54321',
            'email' => 'user@mail.nl',
            'password' => Hash::make('Jp85o08OTbN0'),
            'role' => 1
        ]);
    }
}
