<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'is_active'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function order(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
