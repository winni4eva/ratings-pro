<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBranchZoneTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_zones', function(Blueprint $table){
            $table->increments('id');

            $table->integer('zone_id')->unsigned();
            $table->foreign('zone_id','branchZone_zoneId_fk')
                ->references('id')
                ->on('zones')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('branch_id')->unsigned();
            $table->foreign('branch_id','branchZone_zoneeId_fk')
                ->references('id')
                ->on('branches')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->timestamps();
            $table->unique(['zone_id','branch_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('branch_zone');
    }
}
