<?php

namespace Tests\Unit\Models\StoreObjects;

use App\Models\StoreObjects\Promotion;
use PHPUnit\Framework\TestCase;

class PromotionTest extends TestCase
{
    public function test_customer_message_describes_free_products_promotions(): void
    {
        $promotion = new Promotion([
            'code' => 'DEVTEAM',
            'discount_type' => 'FREE_PRODUCTS',
        ]);

        $this->assertSame(
            'Use code DEVTEAM at checkout to get free products.',
            $promotion->customer_message,
        );
    }

    public function test_free_products_promotions_are_not_visible_on_storefront(): void
    {
        $promotion = new Promotion([
            'discount_type' => 'FREE_PRODUCTS',
            'show_on_storefront' => true,
        ]);

        $this->assertFalse($promotion->isVisibleOnStorefront());
    }
}
