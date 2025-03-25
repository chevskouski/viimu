<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('serviceCategory')
            ->where('status', true)
            ->orderBy('id', 'asc')
            ->get();

        $inactiveServices = Service::with('serviceCategory')
            ->where('status', false)
            ->orderBy('id', 'asc')->get();

        $serviceCategories = ServiceCategory::orderBy('id', 'asc')->get();

        return Inertia::render('Dashboard/Maintenance/Services', [
            'services' => $services,
            'inactiveServices' => $inactiveServices,
            'serviceCategories' => $serviceCategories,
        ]);
    }
    
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'name' => 'required|string|max:75|unique:services',
                'description' => 'nullable|string|max:255',
                'service_category_id' => 'required|exists:service_categories,id',
                'price' => 'required|numeric|min:0',
                'status' => 'boolean',
            ]);
    
            Service::create($validated);

            return back()->with('success', 'Servicio agregado correctamente.');
        } catch (\Exception $e){
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }
    }

    public function update(Request $request, Service $service)
    {
        try{
            $validated = $request->validate([
                'name' => 'string|max:75',
                'description' => 'nullable|string|max:255',
                'service_category_id' => 'exists:service_categories,id',
                'price' => 'numeric|min:0',
                'status' => 'boolean',
            ]);

            $service->update($validated);

            return back()->with('success', 'Servicio actualizado correctamente.');
        } catch (\Exception $e)
        {
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }
    }
    
}
