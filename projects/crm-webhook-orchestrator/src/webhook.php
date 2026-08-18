<?php
declare(strict_types=1);
require __DIR__ . '/IntegrationPipeline.php';

header('Content-Type: application/json');
$payload = json_decode(file_get_contents('php://input'), true) ?: [];
$requestId = $_SERVER['HTTP_X_REQUEST_ID'] ?? ('wh_' . bin2hex(random_bytes(5)));
$attempts = (int)($_SERVER['HTTP_X_RETRY_ATTEMPT'] ?? 0);
$result = (new IntegrationPipeline())->handle($payload, $requestId, $attempts);
http_response_code($result['http_status']);
echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
