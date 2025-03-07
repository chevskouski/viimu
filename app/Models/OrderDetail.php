<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrderDetail extends Model
{
    protected $fillable = [
        'order_id',
        'service_id',
        'shipping_detail_id',
        'description',
        'quantity',
        'subtotal_amount'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
    public function shippingDetail(): BelongsTo
    {
        return $this->belongsTo(ShippingDetail::class);
    }
    public function materialConsumption(): HasMany
    {
        return $this->hasMany(MaterialConsumption::class);
    }
}
