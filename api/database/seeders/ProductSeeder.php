<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Đảm bảo bảng đã migrate trước khi chạy seeder

        $products = [
            [
                'category_id' => 1,
                'name' => 'iPhone 15 Pro',
                'description' => 'Điện thoại cao cấp mới nhất của Apple.',
                'price' => 32990000,
                'stock' => 50,
                'thumbnail' => 'uploads/products/iphone15pro.jpg',
            ],
            [
                'category_id' => 2,
                'name' => 'MacBook Air M3',
                'description' => 'Laptop mỏng nhẹ, hiệu năng cao.',
                'price' => 28990000,
                'stock' => 30,
                'thumbnail' => 'uploads/products/macbookairm3.jpg',
            ],
            [
                'category_id' => 3,
                'name' => 'Áo thun Uniqlo',
                'description' => 'Áo cotton thoáng mát, nhiều màu sắc.',
                'price' => 299000,
                'stock' => 100,
                'thumbnail' => 'uploads/products/aothununiqlo.jpg',
            ],
        ];

        foreach ($products as $p) {
            Product::create([
                'category_id' => $p['category_id'],
                'name' => $p['name'],
                'description' => $p['description'],
                'price' => $p['price'],
                'stock' => $p['stock'],
                'thumbnail' => $p['thumbnail'],
            ]);
        }
    }
}
