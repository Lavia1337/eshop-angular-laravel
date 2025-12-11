<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Lấy danh sách sản phẩm cùng images và category
     */
    public function index()
    {
        return Product::with(['images', 'category'])->get();
    }

    /**
     * Lấy chi tiết sản phẩm theo ID
     */
    public function show($id)
    {
        return Product::with(['images', 'category'])->findOrFail($id);
    }

    /**
     * Thêm sản phẩm mới
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'name'        => 'required|string',
        'price'       => 'required|numeric',
        'quantity'    => 'required|integer|min:0',
        'description' => 'nullable|string',
        'category_id' => 'required|exists:categories,id', // bắt buộc
        'image'       => 'nullable|string'
    ]);

    $product = Product::create([
        'name'        => $validated['name'],
        'price'       => $validated['price'],
        'quantity'    => $validated['quantity'],
        'description' => $validated['description'] ?? null,
        'category_id' => $validated['category_id'] // ✅ đảm bảo category_id lưu
    ]);

    if (!empty($validated['image'])) {
        ProductImage::create([
            'product_id' => $product->id,
            'image_path' => $validated['image']
        ]);
    }

    return $product->load(['images', 'category']);
}

    /**
     * Cập nhật sản phẩm
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'quantity'    => 'required|integer|min:0',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image'       => 'nullable|string'
        ]);

        $product = Product::findOrFail($id);

        $product->update($validated);

        // Nếu có ảnh mới, thêm vào bảng ProductImage
        if (!empty($validated['image'])) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $validated['image']
            ]);
        }

        return $product->load(['images', 'category']);
    }

    /**
     * Xóa sản phẩm
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Xóa luôn ảnh liên quan nếu muốn
        $product->images()->delete();

        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
