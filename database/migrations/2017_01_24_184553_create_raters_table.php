<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raters', function(Blueprint $table){
            $table->increments('id');

            $table->integer('image_id')->unsigned();
            $table->foreign('image_id','raters_imageId_fk')
                ->references('id')
                ->on('images')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('response_id')->unsigned();
            $table->foreign('response_id','raters_responseId_fk')
                ->references('id')
                ->on('responses')
                ->onDelete('cascade')
                ->onUpdate('cascade');
                
            $table->integer('score');
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
        Schema::drop('raters');
    }
}
