<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBranchSurveysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_surveys', function(Blueprint $table){
            $table->increments('id');

            $table->integer('branch_id')->unsigned();
            $table->foreign('branch_id','branch_surveys_branchId_fk')
                ->references('id')
                ->on('branches')
                ->onDelete('cascade')
                ->onUpdate('cascade');
                
            $table->integer('survey_id')->unsigned();
            $table->foreign('survey_id','branch_surveys_surveyId_fk')
                ->references('id')
                ->on('surveys')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('branch_surveys');
    }
}
