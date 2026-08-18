<?php
declare(strict_types=1);

require_once __DIR__ . '/LeadMapper.php';
require_once __DIR__ . '/RetryPolicy.php';

final class IntegrationPipeline
{
    public function __construct(private readonly LeadMapper $mapper = new LeadMapper(), private readonly RetryPolicy $retry = new RetryPolicy()) {}

    public function handle(array $payload, string $requestId, int $attempts = 0): array
    {
        $lead = $this->mapper->normalize($payload);
        $errors = $this->mapper->validate($lead);
        if ($errors !== []) return ['status' => 'rejected', 'http_status' => 422, 'request_id' => $requestId, 'errors' => $errors, 'audit' => ['stage' => 'validated']];
        return ['status' => 'accepted', 'http_status' => 202, 'request_id' => $requestId, 'lead' => $lead, 'next' => ['crm' => 'queued', 'email' => 'queued', 'analytics' => 'queued'], 'retry' => ['attempt' => $attempts, 'max' => 3, 'next_delay_seconds' => $this->retry->nextDelay($attempts)], 'audit' => ['stages' => ['received', 'normalized', 'validated', 'queued']]];
    }
}
