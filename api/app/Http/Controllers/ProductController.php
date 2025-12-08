<?php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductController {

    public function index()
    {
        return Product::get();
    }

    public function show($id)
    {
        return Product::find($id);
    }

    public function store()
    {
        return Product::create([
            'name' => request()->input('name'),
            'price' => request()->input('price')
        ]);
    }

    public function update($id)
    {
        return tap(Product::find($id))->update([
            'name' => request()->input('name'),
            'price' => request()->input('price')
        ]);
    }

    public function destroy($id)
    {
        Product::find($id)->delete();
    }
}