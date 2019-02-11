<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Http\Response;

use App\agenda_item;

use Illuminate\Support\Facades\Auth;

class AgendaController extends Controller
{
    public function index() {
        return response(agenda_item::all()->jsonSerialize(), Response::HTTP_OK);
    }

    public function store(Request $request){

        $agenda_item = new agenda_item();
        $user = Auth::user();

        $agenda_item->title = $request->title;
        $agenda_item->start = $request->start;
        $agenda_item->allDay = $request->allDay;
        $agenda_item->student_number = $user->student_number;
        $agenda_item->description = $request->description;
        $agenda_item->type = $request->type;
        // $agenda_item->from = $request->from;
        // $agenda_item->till = $request->till;
        $agenda_item->save();
        return response($agenda_item->jsonSerialize(), Response::HTTP_CREATED);
    }
}
