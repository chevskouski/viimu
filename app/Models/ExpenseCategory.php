<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseCategory extends Model
{
    protected $fillable = ['name', 'description', 'status'];

    protected $casts = [
        'status' => 'boolean',
    ];
    
    public function expense(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
