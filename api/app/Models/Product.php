<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * Các cột cho phép mass assignment
     */
    protected $fillable = [
        'name',
        'price',
        'quantity',
        'description',
        'category_id',
    ];

    // =====================
    // RELATIONSHIPS
    // =====================

    /**
     * Product thuộc về 1 Category
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Product có nhiều ảnh (product_images)
     */
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    /**
     * Product có nhiều Review
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Product xuất hiện trong nhiều CartItem
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Product xuất hiện trong nhiều OrderItem
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
