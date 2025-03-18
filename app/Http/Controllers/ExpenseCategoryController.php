<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ExpenseCategory;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        $categories = ExpenseCategory::orderBy('id', 'desc')->paginate(8);

        return Inertia::render('Dashboard/Maintenance/ExpenseCategory', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:75|unique:expense_categories',
            'description' => 'nullable|string|max:255',
            'status' => 'boolean',
        ]);

        $category = ExpenseCategory::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status
        ]);

        return back()->with([
            'success' => 'EXPENSE CATEGORY created successfully.',
            'category' => $category,
        ]);
    }

    public function update(Request $request, ExpenseCategory $expenseCategory)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:75|unique:expense_categories,name,'.$expenseCategory->id,
            'description' => 'nullable|string|max:255',
            'status' => 'boolean'
        ]);

        $expenseCategory->update($validate);

        return back()->with([
            'success' => 'EXPENSE CATEGORY updated successfully.',
        ]);
    }

    public function destroy(ExpenseCategory $expenseCategory)
    {
        $expenseCategory->delete();

        return back()->with([
            'success' => 'EXPENSE CATEGORY deleted successfully.'
        ]);
    }
}
