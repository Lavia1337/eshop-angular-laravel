<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;        // ✅ BẮT BUỘC
use App\Models\OrderItem;  // ✅ BẮT BUỘC

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total',
        'status',
        'shipping_address',
        'payment_method',
    ];

    // ==========================
    // USER ĐẶT ĐƠN
    // ==========================
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ==========================
    // CÁC SẢN PHẨM TRONG ĐƠN
    // ==========================
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
