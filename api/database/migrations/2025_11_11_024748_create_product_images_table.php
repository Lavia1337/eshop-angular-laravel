<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('image_path');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::create('product_images', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('product_id'); // đảm bảo cùng kiểu với products.id
    $table->string('image_path');
    $table->timestamps();

    $table->foreign('product_id')
          ->references('id')->on('products')
          ->onDelete('cascade');
});

    }
};
