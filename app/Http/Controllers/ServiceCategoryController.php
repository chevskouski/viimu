<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceCategory;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{

    //SELECT
    public function index()
    {
        $categories = ServiceCategory::orderBy('id', 'asc')->paginate(8);

        return Inertia::render('Dashboard/Maintenance/ServiceCategory', [
            'categories' => $categories,
        ]);

    }

    //INSERT
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:75|unique:service_categories',
            'description' => 'nullable|string|max:255',
            'status' => 'boolean',
        ]);

        $category = ServiceCategory::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status
        ]);

        return back()->with([
            'success' => 'SERVICE CATEGORY created successfully.',
            'category' => $category,
        ]);
    }

    //UPDATE ITEM
    public function update(Request $request, ServiceCategory $serviceCategory)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:75|unique:service_categories,name,'.$serviceCategory->id,
            'description' => 'nullable|string|max:255',
            'status' => 'boolean',
        ]);
        
        $serviceCategory->update($validate);
        
        return back()->with([
            'success' => 'SERVICE CATEGORY updated successfully.'
        ]);
    }

    //DELETE ITEM
    public function destroy(ServiceCategory $serviceCategory)
    {
        $serviceCategory->delete();

        return back()->with([
            'success' => 'SERVICE CATEGORY deleted successfully.'
        ]);
    }
}
