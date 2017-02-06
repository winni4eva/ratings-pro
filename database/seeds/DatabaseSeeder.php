<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BranchesTableSeeder::class);
        $this->command->info('Branch seeds finished.');

        $this->call(UsersTableSeeder::class);
        $this->command->info('User seeds finished.');
    }
}
