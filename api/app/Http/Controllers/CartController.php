<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;

class CartController extends Controller
{
    // GET CART
    public function index()
    {
        $items = CartItem::with('product')
            ->where('user_id', auth()->id())
            ->get();

        return response()->json([
            'items' => $items
        ]);
    }

    // ADD TO CART
public function add(Request $request)
{
    if (!auth()->check()) {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1'
    ]);

    $item = CartItem::where('user_id', auth()->id())
                    ->where('product_id', $request->product_id)
                    ->first();

    if ($item) {
        $item->quantity += $request->quantity;
        $item->save();
    } else {
        CartItem::create([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ]);
    }

    return response()->json(['message' => 'Added']);
}



    // REMOVE FROM CART
    public function remove(Request $request)
    {
        CartItem::where('user_id', auth()->id())
                ->where('product_id', $request->product_id)
                ->delete();

        return response()->json(['message' => 'Removed']);
    }
}
