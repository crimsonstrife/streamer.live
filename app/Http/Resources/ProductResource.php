<?php

namespace App\Http\Resources;

use App\Models\Media;
use App\Utilities\ShopHelper;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request): array
    {
        // grab all media in the "images" collection
        $images = $this->getMedia('images')->map(function (Media $media) {
            return [
                // full URL to the original
                'url' => $media->getFullUrl(),

                // if you have a "thumb" conversion registered:
                'thumbnail' => $media->hasGeneratedConversion('thumb')
                    ? $media->getFullUrl('thumb')
                    : $media->getFullUrl(),

                // optional metadata:
                'order' => $media->order_column,
                'mime' => $media->mime_type,
            ];
        })->values();

        return [
            'id' => $this->id,
            'title' => $this->name,
            'description' => $this->description,
            'price' => $this->symbol_price,
            // build the front-end product URL using ShopHelper
            'url' => ShopHelper::product(
                $this->slug,
                ShopHelper::getShopSlug()
            ),
            'images' => $images,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
