<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShippingDetail extends Model
{
    protected $fillable = [
        'recipient_name',
        'recipient_phone',
        'recipient_department',
        'recipient_city',
        'recipient_address',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function OrderDetail(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }
}
