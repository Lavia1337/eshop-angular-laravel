<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * USER: Thêm đánh giá sản phẩm
     * Yêu cầu đăng nhập (auth:sanctum)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating'     => 'required|integer|min:1|max:5',
            'comment'    => 'nullable|string|max:1000',
        ]);

        $review = Review::create([
            'user_id'    => auth()->id(),
            'product_id'=> $validated['product_id'],
            'rating'     => $validated['rating'],
            'comment'    => $validated['comment'] ?? null,
        ]);

        return response()->json([
            'message' => 'Đánh giá thành công!',
            'review'  => $review->load('user'),
        ], 201);
    }
}
