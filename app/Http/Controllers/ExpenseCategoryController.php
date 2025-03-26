<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ExpenseCategory;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        $expenseCategories = ExpenseCategory::where('status', true)
            ->orderBy('id', 'asc')
            ->get();

        $inactiveExpenseCategories = ExpenseCategory::where('status', false)
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('Dashboard/Maintenance/ExpenseCategories', [
            'expenseCategories' => $expenseCategories,
            'inactiveExpenseCategories' => $inactiveExpenseCategories,
        ]);
    }

    public function store(Request $request)
    {
        try
        {
            $validated = $request->validate([
                'name' => 'required|string|max:75|unique:expense_categories',
                'description' => 'nullable|string|max:255',
                'status' => 'boolean',
            ]);

            ExpenseCategory::create($validated);

            return back()->with('success', 'La Categoría de Gasto se ha agregado correctamente.');
        } catch (\Exception $e)
        {
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try
        {
            $expenseCategory = ExpenseCategory::findOrFail($id);

            $validated = $request->validate([
                'name' => 'string|max:75',
                'description' => 'nullable|string|max:255',
                'status' => 'boolean'
            ]);

            $expenseCategory->update($validated);

            return back()->with('success', 'La Categoría de Gasto se ha actualizado correctamente.');
        } catch (\Exception $e)
        {
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }
    }
}
