<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceCategory;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        $categories = ServiceCategory::all();

        return Inertia::render('Dashboard/Maintenance/ServiceCategory', [
            'categories' => $categories,
        ]);

    }

    public function store(Request $request)
    {
        $validate = $request->validate([
        'name' => 'required|string|max:75|unique:service_categories',
        'description' => 'nullable|string|max:255',
        'status' => 'boolean',
    ]);

    $category = ServiceCategory::create($validate);

    return back()->with([
        'success' => 'SERVICE CATEGORY created successfully.',
        'category' => $category,
    ]);
    }

    public function show(ServiceCategory $serviceCategory)
    {
        return Inertia::render('ServiceCategory/Show', [
            'category' => $serviceCategory,
        ]);
    }

    public function update(Request $request, ServiceCategory $serviceCategory)
    {
        $validate = $request->validate([
            'name' => 'required'|'string'|'max:75'|'unique:service_categories,name,'.$serviceCategory->id,
            'description' => 'nullable'|'string'|'max:255',
            'status' => 'boolean',
        ]);

        $serviceCategory->update($validate);

        return redirect()->route('service-categories.index')
        -> with('success', 'Service category updated successfully.');
    }

    public function destroy(ServiceCategory $serviceCategory)
    {
        $serviceCategory->delete();

        return redirect()->route('service-categories.index')
        -> with('message', 'Service category deleted successfully.');
    }
}
