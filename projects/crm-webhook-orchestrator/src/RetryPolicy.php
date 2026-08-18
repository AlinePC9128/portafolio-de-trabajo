<?php
declare(strict_types=1);

final class RetryPolicy
{
    public function shouldRetry(int $statusCode, int $attempts): bool
    {
        return $attempts < 3 && ($statusCode === 408 || $statusCode === 429 || $statusCode >= 500);
    }

    public function nextDelay(int $attempts): int
    {
        return min(60, 2 ** max(0, $attempts));
    }
}
