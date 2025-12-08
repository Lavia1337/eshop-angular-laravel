<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
   use HasFactory, HasApiTokens, Notifiable;

//public $timestamps = false;

protected $fillable = [
    'name', 'email', 'password', 'role'
];

protected $hidden = [
    'password',
];


    // Quan hệ
    public function carts() {
        return $this->hasMany(Cart::class);
    }

    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function addresses() {
        return $this->hasMany(Address::class);
    }

    public function payments() {
        return $this->hasMany(Payment::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }
}
