<?php

namespace App\Parsers;

use App\Models\AuthObjects\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Xetaio\Mentions\Parser\MentionParser;

class UserMentionParser extends MentionParser
{
    protected function replace(array $match): string
    {
        $character = $this->getOption('character');
        $mention = Str::title(str_replace($character, '', trim($match[0])));

        // Here we can add additional validation to ensure the mention is valid, check if the user exists, etc.
        $isValid = User::where('username', $mention)->exists();

        if ($isValid) {
            $route = config('mentions.pools.' . $this->getOption('pool') . '.route');

            $link = $route . $mention;

            // Here we return a HTML link instead of the default Markdown.
            return " <a class=\"link\" href=\"{$link} \">{$character}{$mention}</a>";
        }

        // If the mention is not valid, we return the original match.
        return $match[0];
    }
}
