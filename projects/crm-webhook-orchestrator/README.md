# CRM Webhook Orchestrator

Hub central: [Aline Labs](https://github.com/AlinePC9128/portafolio-de-trabajo/tree/main/labs) · [demo](./public/)

Caso de integración para demostrar cómo una aplicación recibe un webhook, valida el payload, normaliza campos y prepara una oportunidad para un CRM.

## Stack

- PHP 8.3
- MySQL 8
- HTTP/POST y JSON
- Webhooks y mapeo de campos
- Docker Compose
- Integración conceptual con Perfex CRM, Salesforce, Mailchimp, WhatsApp y Zapier

## Flujo

```text
Formulario / Ads → webhook.php → LeadMapper → tbl_leads → CRM / seguimiento
```

## Ejecutar

```bash
docker compose up --build
```

La demo visual en `public/index.html` funciona como preview estática.

## Escenarios incluidos

- Payloads de formulario, Meta Lead Ads, Zapier y payload inválido.
- Normalización de `field_data`, validación de consentimiento y mapeo de campos.
- `requestId`, auditoría por etapas, reintentos exponenciales e idempotencia.
- Preparación de colas para CRM, email, analytics y seguimiento.

## Variantes de implementación

- `LeadMapper`: transformación pura y fácil de probar.
- `IntegrationPipeline`: orquestación de validación, cola y auditoría.
- `RetryPolicy`: política aislada para respuestas 408, 429 y 5xx.
- MySQL como persistencia y Docker Compose como entorno reproducible.
