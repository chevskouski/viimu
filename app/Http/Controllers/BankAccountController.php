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
        $bankAccounts = BankAccount::where('status', true)
            ->orderBy('id', 'asc')->get();

        $inactiveBankAccounts = BankAccount::where('status', false)
            ->orderBy('id', 'asc')->get();

        return Inertia::render('Dashboard/Maintenance/BankAccounts', [
            'bankAccounts' => $bankAccounts,
            'inactiveBankAccounts' => $inactiveBankAccounts,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:75|unique:bank_accounts',
                'account_number' => 'required|string|max:124|unique:bank_accounts',
                'currency' => ['required', Rule::in(['GTQ', 'USD', 'EUR'])],
                'type' => ['required', Rule::in(['savings', 'monetary'])],
                'open_balance' => 'numeric',
                'status' => 'boolean'
            ]);

            BankAccount::create($validated);
    
            return back()->with('success', 'Cuenta agregada correctamente.');
        } catch (\Exception $e){
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }   
    }

    public function update(Request $request, $id)
    {
        try
        {
            $bankAccount = BankAccount::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:75',
                'account_number' => 'required|string|max:124',
                'currency' => ['required', Rule::in(['GTQ', 'USD', 'EUR'])],
                'type' => ['required', Rule::in(['savings', 'monetary'])],
                'open_balance' => 'required|numeric',
                'status' => 'boolean'
            ]);
            
            $bankAccount->update($validated);

            return back()->with('success', 'Cuenta actualizada correctamente.');
        } catch (\Exception $e)
        {
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }
    }
}
