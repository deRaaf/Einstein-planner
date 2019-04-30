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
            'first_name' => 'Docent',
            'last_name' => 'Account',
            'student_number' => null,
            'email' => 'hallo@email.nl',
            'password' => Hash::make('admin'),
            'role' => 2
        ]);

        User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'student_number' => '12345',
            'email' => 'demo@demo.nl',
            'password' => Hash::make('demo'),
            'role' => 1
        ]);
    }
}
