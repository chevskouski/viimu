<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BankAccountController extends Controller
{
    public function index()
    {
        $categories = BankAccount::orderBy('id', 'asc')->paginate(8);

        return Inertia::render('Dashboard/Maintenance/BankAccount', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:75|unique:bank_accounts',
            'account_number' => 'required|string|max:124|unique:bank_accounts',
            'currency' => ['required', Rule::in(['GTQ', 'USD', 'EUR'])],
            'type' => ['required', Rule::in(['savings', 'monetary'])],
            'status' => 'boolean'
        ]);

        $category = BankAccount::create([
            'name' => $request->name,
            'account_number' => $request->account_number,
            'currency' => $request->currency,
            'type' => $request->type,
            'status' => $request->status
        ]);

        return back()->with([
            'success' => 'ACCOUNT added successfully.',
            'category' => $category,
        ]);
    }

    public function update(Request $request, BankAccount $bankAccount)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:75|unique:bank_accounts',
            'account_number' => 'required|string|max:124|unique:bank_accounts',
            'currency' => ['required', Rule::in(['GTQ', 'USD', 'EUR'])],
            'type' => ['required', Rule::in(['savings', 'monetary'])],
            'status' => 'boolean'
        ]);
        
        $bankAccount->update($validate);
        
        return back()->with([
            'success' => 'ACCOUNT updated successfully.'
        ]);
    }

    public function destroy(BankAccount $bankAccount)
    {
        $bankAccount->delete();

        return back()->with([
            'success' => 'ACCOUNT deleted successfully.'
        ]);
    }
}
