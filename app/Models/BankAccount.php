<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BankAccount extends Model
{
    protected $fillable = [
        'name',
        'account_number',
        'currency',
        'type',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function payment(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
    public function expense(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
