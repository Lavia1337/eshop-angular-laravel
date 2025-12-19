<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * GET /products
     */
    public function index()
    {
        return Product::with(['images', 'category'])->get();
    }

    /**
     * GET /products/{id}
     */
    public function show($id)
    {
        return Product::with(['images', 'category'])->findOrFail($id);
    }

    /**
     * POST /products
     * ❌ KHÔNG lưu ảnh ở đây
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'quantity'    => 'required|integer|min:0',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        return Product::create($validated);
    }

    /**
     * PUT /products/{id}
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'quantity'    => 'required|integer|min:0',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        return $product->load(['images', 'category']);
    }

    /**
     * DELETE /products/{id}
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->images()->delete();
        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }

    /**
     * POST /products/{id}/images/url
     * ✅ LƯU URL ẢNH VÀO product_images
     */
    public function storeImageUrl(Request $request, $id)
    {
        $request->validate([
            'image_url' => 'required|url'
        ]);

        $product = Product::findOrFail($id);

        $image = $product->images()->create([
            'image_path' => $request->image_url
        ]);

        return response()->json([
            'message' => 'Lưu ảnh thành công',
            'image'   => $image
        ], 201);
    }
}
