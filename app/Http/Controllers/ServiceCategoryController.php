<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceCategory;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        $serviceCategories = ServiceCategory::orderBy('id', 'asc')->get();

        return Inertia::render('Dashboard/Maintenance/ServiceCategories', [
            'serviceCategories' => $serviceCategories,
        ]);
    }

    public function store(Request $request)
    {
        try
        {
            $validated = $request->validate([
                'name' => 'required|string|max:75|unique:service_categories',
                'description' => 'nullable|string|max:255',
                'status' => 'boolean',
            ]);

            ServiceCategory::create($validated);

            return back()->with('success', 'Categoría de Servicio agregado correctamente.');
        } catch (\Exception $e){
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }        
    }

    public function update(Request $request, ServiceCategory $serviceCategory)
    {
        try
        {
            $validate = $request->validate([
                'name' => 'string|max:75|unique:service_categories,name,'.$serviceCategory->id,
                'description' => 'nullable|string|max:255',
                'status' => 'boolean',
            ]);
            
            $serviceCategory->update($validate);

            return back()->with('success', 'Categoría de Servicio actualizada correctamente.');
        } catch (\Exception $e)
        {
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }
    }
}
