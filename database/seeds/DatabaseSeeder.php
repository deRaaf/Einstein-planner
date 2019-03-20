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
            'email' => 'hallo@timderaaf.nl',
            'password' => Hash::make('admin'),
            'role' => 2
        ]);

        User::create([
            'name' => 'Tim',
            'student_number' => '12345',
            'email' => 'timraaf@hotmail.com',
            'password' => Hash::make('secret'),
            'role' => 1
        ]);

        User::create([
            'name' => 'Bert',
            'student_number' => '54321',
            'email' => 't-l-b@hotmail.nl',
            'password' => Hash::make('Jp85o08OTbN0'),
            'role' => 1
        ]);
    }
}
