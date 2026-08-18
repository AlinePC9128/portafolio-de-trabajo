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
