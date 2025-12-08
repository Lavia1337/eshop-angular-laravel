<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Điện thoại', 'description' => 'Các loại smartphone và phụ kiện.'],
            ['name' => 'Laptop', 'description' => 'Máy tính xách tay, thiết bị văn phòng.'],
            ['name' => 'Thời trang', 'description' => 'Quần áo, giày dép, phụ kiện thời trang.'],
            ['name' => 'Gia dụng', 'description' => 'Đồ dùng gia đình và thiết bị điện tử.'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
