<?php
declare(strict_types=1);

final class LeadMapper
{
    private function value(array $payload, string $key): mixed
    {
        if (array_key_exists($key, $payload)) return $payload[$key];
        foreach (($payload['field_data'] ?? []) as $field) {
            if (($field['name'] ?? '') === $key) return $field['values'][0] ?? null;
        }
        return null;
    }

    public function normalize(array $payload): array
    {
        return [
            'name' => trim((string)($this->value($payload, 'full_name') ?: $this->value($payload, 'name') ?: '')),
            'email' => strtolower(trim((string)($this->value($payload, 'email') ?? ''))),
            'phone' => preg_replace('/[^0-9+]/', '', (string)($this->value($payload, 'phone') ?? '')),
            'city' => trim((string)($this->value($payload, 'city') ?? '')),
            'service' => trim((string)($this->value($payload, 'service') ?? '')),
            'source' => trim((string)($this->value($payload, 'source') ?? ($payload['ad_id'] ?? 'webhook'))),
            'consent' => (bool)($payload['consent'] ?? true),
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
