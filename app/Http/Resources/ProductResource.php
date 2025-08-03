<?php

namespace App\Http\Resources;

use App\Utilities\ShopHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            // build the front-end product URL using ShopHelper
            'url' => ShopHelper::product(
                $this->slug,
                ShopHelper::getShopSlug()
            ),
            'image' => $this->image
                ? url('storage/'.$this->image)
                : null,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
