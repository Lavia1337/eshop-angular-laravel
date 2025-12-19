<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;

class OrderController extends Controller
{
    // ==================================================
    // USER: xem đơn của mình
    // ADMIN: xem TẤT CẢ đơn
    // ==================================================
    public function index(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if ($user->role === 'admin') {
            // ADMIN: tất cả đơn
            $orders = Order::with(['items.product', 'user'])
                ->orderByDesc('created_at')
                ->get();
        } else {
            // USER: đơn của mình
            $orders = Order::with('items.product')
                ->where('user_id', $user->id)
                ->orderByDesc('created_at')
                ->get();
        }

        return response()->json($orders);
    }

    // ==================================================
    // USER: CHECKOUT
    // ==================================================
    public function checkout(Request $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'address' => 'required|string|max:255',
            'payment_method' => 'required|string|max:50',
        ]);

        $cartItems = CartItem::with('product')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        DB::beginTransaction();

        try {
            $total = $cartItems->sum(
                fn ($item) => $item->product->price * $item->quantity
            );

            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                'status' => 'pending',
                'shipping_address' => $request->address,
                'payment_method' => $request->payment_method,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order_id' => $order->id,
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Order failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // ==================================================
    // USER: CHI TIẾT ĐƠN (CHỈ ĐƠN CỦA MÌNH)
    // ==================================================
    public function show(int $id): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $query = Order::with('items.product')->where('id', $id);

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $order = $query->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    // ==================================================
    // ADMIN: CẬP NHẬT TRẠNG THÁI
    // ==================================================
    public function update(Request $request, int $id): JsonResponse
{
    $user = Auth::user();

    if (!$user || $user->role !== 'admin') {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    $request->validate([
        'status' => 'nullable|in:pending,shipping,completed,cancelled',
        'shipping_address' => 'nullable|string|max:255',
        'payment_method' => 'nullable|string|max:50',
        'total' => 'nullable|numeric|min:0'
    ]);

    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    $order->update($request->only([
        'status',
        'shipping_address',
        'payment_method',
        'total'
    ]));

    return response()->json([
        'message' => 'Order updated successfully',
        'order' => $order
    ]);
}
}
