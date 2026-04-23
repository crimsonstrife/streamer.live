<?php

namespace App\Settings;

use App\Models\Settings;

class CommunitySettings extends Settings
{
    public bool $enable_community;

    public bool $require_thread_approval;

    public bool $require_reply_approval;

    public int $rate_limit_threads_per_hour;

    public int $rate_limit_replies_per_hour;

    public int $min_account_age_days;

    public ?int $default_community_category_id;

    public static function group(): string
    {
        return 'community';
    }
}
