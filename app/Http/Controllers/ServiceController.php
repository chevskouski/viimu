<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        //$categories = Service::orderBy('id', 'asc')->paginate(8);

        return Inertia::render('Dashboard/Maintenance/Services', [
            //'categories' => $categories,
        ]);
    }
}
