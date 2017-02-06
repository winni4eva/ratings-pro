<?php

use Illuminate\Database\Seeder;
use App\Branch;

class BranchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Branch::getQuery()->delete();

        $branches = [
            ['name' => 'Spintex'],
            ['name' => 'Ring Road'],
            ['name' => 'Achimota'],
            ['name' => 'Tema']
        ];
            
        // Loop through each user above and create the record for them in the database
        foreach ($branches as $branch){
            $branch = Branch::create($branch);
            //$user->branchUser()->create(['branch_id' => $request['branch_id'], 'admin' => $request['admin']]);
        }
    }
}
