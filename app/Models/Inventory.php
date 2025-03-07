<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inventory extends Model
{
    protected $fillable = [
        'name', 
        'description', 
        'stock', 
        'last_restock_date'
    ];
    
    public function materialConsumption(): HasMany
    {
        return $this->hasMany(MaterialConsumption::class);
    }
}
