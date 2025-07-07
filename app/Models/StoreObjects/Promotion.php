<?php

namespace App\Models\StoreObjects;

use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Promotion extends Model
{
    use IsPermissible;

    protected $fillable = [
        'provider_id',
        'provider',
        'title',
        'code',
        'discount_type',
        'percentage',
        'amount_value',
        'amount_currency',
        'shipping_option',
        'applies_to',
        'once_per_order',
        'min_order_value',
        'min_order_currency',
        'max_uses',
        'one_use_per_customer',
        'status',
        'type',
    ];

    protected $casts = [
        'once_per_order'         => 'boolean',
        'one_use_per_customer'   => 'boolean',
        'percentage'             => 'integer',
        'amount_value'           => 'integer',
        'min_order_value'        => 'integer',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'promotion_product');
    }

    public function scopeLive($query)
    {
        return $query->where('status','Live');
    }

    public function scopeEntireOrder($query)
    {
        return $query->where('applies_to','ENTIRE_ORDER');
    }

    public function scopeSelectedProducts($query)
    {
        return $query->where('applies_to', 'SELECTED_PRODUCTS');
    }

    /**
     * A customer-facing message for this promo.
     */
    public function getCustomerMessageAttribute(): ?string
    {
        if ($this->description) {
            return $this->description;
        }

        if (strtoupper($this->title) === 'TWITCHSUB') {
            if ($this->type === 'SHOP_AUTO_APPLYING') {
                return "Twitch subscribers get ".($this->discount_type === 'PERCENTAGE'
                        ? "{$this->percentage}% off"
                        : number_format($this->amount_value / 100, 2)." {$this->amount_currency}"
                    ). " on " . ($this->applies_to === 'ENTIRE_ORDER' ? "your entire order" : "select products") . " — you’ll be prompted to log in with Twitch at checkout.";
            }
        }

        // defaults
        if ($this->type === 'SHOP_AUTO_APPLYING') {
            return "This discount will be auto-applied at checkout when you’re eligible.";
        }

        return "Use code {$this->code} at checkout to get "
            .($this->discount_type === 'PERCENTAGE'
                ? "{$this->percentage}% off"
                : number_format($this->amount_value / 100, 2)." {$this->amount_currency}"
            ).".";
    }
}
