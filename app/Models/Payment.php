<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'bank_account_id',
        'amount',
        'payment_method',
        'reference_number',
        'voucher',
        'payment_date',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class);
    }
}
