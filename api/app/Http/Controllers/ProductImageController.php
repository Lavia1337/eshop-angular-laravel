<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    /**
     * POST /products/{id}/images/url
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'image_url' => 'required|url'
        ]);

        $product = Product::findOrFail($id);

        $image = $product->images()->create([
            'image_path' => $request->image_url
        ]);

        return response()->json($image, 201);
    }

    /**
     * DELETE /product-images/{id}
     */
    public function destroy($id)
    {
        \App\Models\ProductImage::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
