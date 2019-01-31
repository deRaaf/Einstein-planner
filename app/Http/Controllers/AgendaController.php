<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\agenda_item;

class AgendaController extends Controller
{
    public function index() {
        $agenda_items = auth()->user()->agenda_items;

        return $agenda_items;

        return view('index', compact('agenda_items'));
    }
}
