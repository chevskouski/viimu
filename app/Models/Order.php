<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'order_number',
        'order_date',
        'delivery_date',
        'total_amount',
        'status',
        'payment_status',
        'notes',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
    public function orderDetail(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }
}
