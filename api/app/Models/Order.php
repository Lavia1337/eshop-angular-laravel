<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'total', 'status', 'payment_id', 'address_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function payment() {
        return $this->belongsTo(Payment::class);
    }

    public function address() {
        return $this->belongsTo(Address::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }
}
