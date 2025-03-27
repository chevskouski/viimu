<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Models\InventoryMovement;
use Inertia\Inertia;

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
}
