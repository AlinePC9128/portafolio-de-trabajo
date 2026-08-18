<?php
declare(strict_types=1);

final class LeadMapper
{
    public function normalize(array $payload): array
    {
        return [
            'name' => trim((string)($payload['full_name'] ?? $payload['name'] ?? '')),
            'email' => strtolower(trim((string)($payload['email'] ?? ''))),
            'phone' => preg_replace('/[^0-9+]/', '', (string)($payload['phone'] ?? '')),
            'city' => trim((string)($payload['city'] ?? '')),
            'service' => trim((string)($payload['service'] ?? '')),
            'source' => trim((string)($payload['source'] ?? 'webhook')),
            'consent' => (bool)($payload['consent'] ?? false),
            'received_at' => gmdate('c'),
        ];
    }

    public function validate(array $lead): array
    {
        $errors = [];
        if ($lead['name'] === '') $errors['name'] = 'El nombre es obligatorio.';
        if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'El correo no es válido.';
        if (!$lead['consent']) $errors['consent'] = 'Se requiere consentimiento.';
        return $errors;
    }
}
