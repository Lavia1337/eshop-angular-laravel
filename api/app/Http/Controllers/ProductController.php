<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductController {

    public function index()
    {
        return Product::with('images')->get();
    }

    public function show($id)
    {
        return Product::with('images')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:0',
            'description' => 'nullable|string'
        ]);

        // Tạo sản phẩm
        $product = Product::create($validated);

        // Nếu có ảnh gửi lên
        if ($request->has('image')) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $request->image
            ]);
        }

        return $product->load('images');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:0',
            'description' => 'nullable|string'
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        // Nếu có ảnh mới upload thì thêm vào bảng product_images
        if ($request->has('image')) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $request->image
            ]);
        }

        return $product->load('images');
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
