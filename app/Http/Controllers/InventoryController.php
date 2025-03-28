<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Models\InventoryMovement;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    public function index()
    {
        $inventory = Inventory::orderBy('id', 'asc')
            ->get();

        $inventoryMovement = InventoryMovement::with('inventory')
            ->orderBy('movement_date', 'desc')
            ->get();

        $lastInventoryMovements = InventoryMovement::with('inventory:id,name')
            ->select('id','inventory_id','type','quantity')        
            ->orderBy('movement_date', 'desc')
            ->take(5)
            ->get(); 

        return Inertia::render('Dashboard/Inventory', [
            'inventory' => $inventory,
            'inventoryMovement' => $inventoryMovement,
            'lastInventoryMovements' => $lastInventoryMovements
        ]);
    }

    public function store(Request $request)
    {
        try
        {
            $validated = $request->validate([
                'id' => 'required|numeric',
                'type' => ['required', Rule::in(['in', 'out'])],
                'quantity' => 'required|numeric',
                'description' => 'required|string|max:255',                
            ]);

            DB::statement("CALL sp_update_inventory(?, ?, ?, ?)", [
                $validated['id'],
                $validated['type'],
                $validated['quantity'],
                $validated['description']
            ]);
    
            return back()->with('success', 'Inventario actualizado correctamente.');
        } catch (\Exception $e)
        {
            return back()->withErrors(['error' => "Error: " . $e->getMessage()]);
        }
    }
}
