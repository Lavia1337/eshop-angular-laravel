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
   public function remove($productId, Request $request)
    {
        $user = $request->user();
        
        // Tìm và xóa
        $deleted = CartItem::where('user_id', $user->id)
                    ->where('product_id', $productId)
                    ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Đã xóa sản phẩm']);
        }
        
        return response()->json(['message' => 'Không tìm thấy sản phẩm'], 404);
    }
}
