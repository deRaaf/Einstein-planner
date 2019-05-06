<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\agenda_item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AgendaController extends Controller
{
    public function index() {
        $user = Auth::user();
        $student_number = $user->student_number;
        
        return response(agenda_item::where('student_number', $student_number)->get()->jsonSerialize(), Response::HTTP_OK);
    }

    public function show($id) {
        $user = Auth::user();
        $student_number = $user->student_number;
        
        return response(agenda_item::where([['student_number',  $student_number], ['id', $id],])->get()->jsonSerialize(), Response::HTTP_OK);
    }

    public function update(Request $request, $id) {
        $v = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'start' => ['required', 'string', 'max:255'],
        ]);

        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }

        $user = Auth::user();
        $student_number = $user->student_number;
        $agenda_item = Agenda_item::find($id);

        $agenda_item->title = $request->title;
        $agenda_item->start = $request->start;
        $agenda_item->end = $request->end;
        $agenda_item->allDay = $request->allDay;
        $agenda_item->student_number = $user->student_number;
        $agenda_item->description = $request->description;
        $agenda_item->type = $request->type;
        $agenda_item->class = $request->class;
        $agenda_item->completed = $request->completed;
        $agenda_item->save();

        return response($agenda_item->jsonSerialize(), Response::HTTP_CREATED);
    }

    public function edit(Request $request, $id) {
        $user = Auth::user();
        $student_number = $user->student_number;
        $agenda_item = Agenda_item::find($id);
        
        $agenda_item->completed = $request->completed;
        $agenda_item->save();

        return response($agenda_item->jsonSerialize(), Response::HTTP_CREATED);
    }

    public function store(Request $request){

        $v = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'start' => ['required', 'string', 'max:255'],
        ]);

        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }

        $agenda_item = new agenda_item();
        $user = Auth::user();

        $agenda_item->title = $request->title;
        $agenda_item->start = $request->start;
        $agenda_item->end = $request->end;
        $agenda_item->allDay = $request->allDay;
        $agenda_item->student_number = $user->student_number;
        $agenda_item->description = $request->description;
        $agenda_item->type = $request->type;
        $agenda_item->save();
        return response($agenda_item->jsonSerialize(), Response::HTTP_CREATED);
    }

    public function destroy($id) {
        $agenda_item = agenda_item::findOrFail($id);

        $agenda_item->delete();
    }
}
