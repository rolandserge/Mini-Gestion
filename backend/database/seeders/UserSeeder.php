<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Alex Martin',
            'email' => 'alex@gmail.com',
            'password' => bcrypt('password123'),
        ]);

        User::create([
            'name' => 'Sophie Laurent',
            'email' => 'sophie@yahoo.com',
            'password' => bcrypt('password123'),
        ]);
    }
}
