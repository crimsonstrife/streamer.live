<?php

namespace App\Services;

use App\Contracts\SpamEvaluator;
use App\Models\Comment;

class SpamCheckService
{
    /**
     * @param  SpamEvaluator[]  $evaluators
     */
    public function __construct(protected iterable $evaluators)
    {
    }

    public function getScore(Comment $comment): int
    {
        $total = 0;
        foreach ($this->evaluators as $eval) {
            $total += $eval->evaluate($comment);
        }

        return $total;
    }

    public function isSpam(Comment $comment): bool
    {
        // pick a threshold—e.g. 5 points or more is “spam”
        return $this->getScore($comment) >= 5;
    }
}
