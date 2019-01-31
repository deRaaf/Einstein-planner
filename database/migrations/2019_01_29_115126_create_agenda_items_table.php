<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgendaItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agenda_items', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('student_number');
            $table->string('type');
            $table->date('date');
            $table->time('from');
            $table->time('till');
            $table->boolean('completed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agenda_items');
    }
}
