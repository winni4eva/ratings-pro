<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRoleToBranchUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function(Blueprint $table){
            $table->string('role')->after('company')->nullable();
            $table->integer('role_branch_zone_id')->after('role')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('users', 'role') && Schema::hasColumn('users', 'role_branch_zone_id'))
        {
            Schema::table('users', function(Blueprint $table){
                $table->dropColumn('role');
                $table->dropColumn('role_branch_zone_id');
            });
        }
    }
}
