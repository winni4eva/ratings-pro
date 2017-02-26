<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNullableToRatingsPreviousResponse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ratings', function (Blueprint $table) {
            //$table->('previous_response_id', 50)->nullable()->change();
            //$table->integer('previous_response_id')->unsigned()->nullable()->change();
            // $table->foreign('previous_response_id','rating_previousResponseId_fk')
            //     ->references('id')
            //     ->on('responses')
            //     ->onDelete('cascade')
            //     ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
