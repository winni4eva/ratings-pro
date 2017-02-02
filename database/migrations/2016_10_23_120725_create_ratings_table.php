<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('branch_id')->unsigned();
            $table->foreign('branch_id','rating_branchId_fk')
                ->references('id')
                ->on('branches')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            $table->integer('survey_id')->unsigned();
            $table->foreign('survey_id','rating_surveyId_fk')
                ->references('id')
                ->on('surveys')
                ->onDelete('cascade')
                ->onUpdate('cascade');
                
            $table->integer('question_id')->unsigned();
            $table->foreign('question_id','rating_questionId_fk')
                ->references('id')
                ->on('questions')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('previous_response_id')->unsigned();
            $table->foreign('previous_response_id','rating_previousResponseId_fk')
                ->references('id')
                ->on('responses')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('response_id')->unsigned();
            $table->foreign('response_id','rating_responseId_fk')
                ->references('id')
                ->on('responses')
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
        Schema::dropIfExists('ratings');
    }
}
