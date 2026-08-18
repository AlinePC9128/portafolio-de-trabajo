<?php
declare(strict_types=1);
require __DIR__ . '/LeadMapper.php';

header('Content-Type: application/json');
$payload = json_decode(file_get_contents('php://input'), true) ?: [];
$mapper = new LeadMapper();
$lead = $mapper->normalize($payload);
$errors = $mapper->validate($lead);

if ($errors !== []) { http_response_code(422); echo json_encode(['error' => 'VALIDATION_ERROR', 'details' => $errors]); exit; }

// En una integración real, aquí se insertaría en MySQL y se llamaría al CRM.
echo json_encode(['status' => 'accepted', 'lead' => $lead, 'next' => ['crm' => 'queued', 'email' => 'queued']]);
