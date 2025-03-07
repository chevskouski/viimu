<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenseInventory extends Model
{
    protected $fillable = ['expense_id', 'inventory_id'];

    public function expense(): BelongsTo
    {
        return $this->belongsTo(Expense::class);
    }
    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class);
    }
}
