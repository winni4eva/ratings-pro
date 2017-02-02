<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProbeQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('probe_questions', function(Blueprint $table){
            $table->increments('id');

            $table->integer('question_number')->unsigned();
            $table->foreign('question_number','probe_questions_questionId_fk')
                ->references('id')
                ->on('questions')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('next_question')->unsigned();
            $table->foreign('next_question','probe_questions_nextQuestionId_fk')
                ->references('id')
                ->on('questions')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('expected_answer')->unsigned();
            $table->foreign('expected_answer','probe_questions_responseId_fk')
                ->references('id')
                ->on('responses')
                ->onDelete('cascade')
                ->onUpdate('cascade');
                
            $table->string('equality');
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
        Schema::drop('probe_questions');
    }
}
