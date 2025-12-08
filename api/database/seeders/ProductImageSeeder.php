<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            ['product_id' => 1, 'image_path' => 'uploads/products/iphone15pro_1.jpg'],
            ['product_id' => 1, 'image_path' => 'uploads/products/iphone15pro_2.jpg'],
            ['product_id' => 2, 'image_path' => 'uploads/products/macbookairm3_1.jpg'],
            ['product_id' => 3, 'image_path' => 'uploads/products/aothununiqlo_1.jpg'],
        ];

        foreach ($images as $img) {
            ProductImage::create($img);
        }
    }
}
