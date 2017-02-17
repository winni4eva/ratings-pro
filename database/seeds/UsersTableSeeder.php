<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Branch;
use App\Domain\Services\Branch\BranchService;

class UsersTableSeeder extends Seeder
{

    protected $branchService;

    public function __construct(BranchService $branchService){
        $this->branchService = $branchService;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::getQuery()->delete();

        $users = array(
                ['first_name' => 'adam','last_name' => 'winni','company' => 'dvak', 'email' => 'adam@dvak.com', 'password' => bcrypt('secret')],
                ['first_name' => 'victor','last_name' => 'ogunsuyi','company' => 'dvak', 'email' => 'victor@dvak.com', 'password' => bcrypt('secret')],
                ['first_name' => 'kofi','last_name' => 'mr','company' => 'dvak', 'email' => 'kofi@dvak.com', 'password' => bcrypt('secret')],
                ['first_name' => 'manford','last_name' => 'mr','company' => 'krif', 'email' => 'manford@krif.com', 'password' => bcrypt('secret')],
                ['first_name' => 'david','last_name' => 'mr','company' => 'dvak', 'email' => 'david@dvak.com', 'password' => bcrypt('secret')]
        );
            
        // Loop through each user above and create the record for them in the database
        $branch = Branch::first();
        
        foreach ($users as $user){
            $user = User::create($user);
            $user->branchUser()->create(['branch_id' => $branch->id, 'admin' => 1 ]);
        }

    }
}
