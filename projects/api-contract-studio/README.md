# API Contract Studio

Hub central: [Aline Labs](https://github.com/AlinePC9128/portafolio-de-trabajo/tree/main/labs) · [demo](./demo/)

API-first para registrar leads de manera segura y documentada. Este caso muestra backend, validación, contratos y pruebas automatizadas.

## Stack

- Node.js + TypeScript
- Express
- Zod para validación de entrada
- OpenAPI para documentar endpoints
- Vitest + Supertest para pruebas
- Docker / Docker Compose

## Endpoints

| Método | Ruta | Propósito |
|---|---|---|
| GET | `/health` | Estado del servicio |
| GET | `/api/leads` | Lista de leads |
| POST | `/api/leads` | Valida y registra un lead |
| GET | `/docs` | Documentación OpenAPI |

## Ejecutar

```bash
npm install
npm run dev
npm test
```

La preview estática en `demo/` permite mostrar el flujo de API en GitHub Pages sin levantar Node.

## Escenarios incluidos

- `201 Created`: alta válida con `requestId` e idempotency key.
- `422 Unprocessable Entity`: errores por campo para recuperación del frontend.
- `409 Conflict`: replay de una petición duplicada.
- `GET /api/leads?page=1&limit=20`: paginación y filtro de estado.
- `/health`, `/docs` y `/openapi.json`: operación y contrato visible.

## Variantes de implementación

- Repositorio en memoria para desarrollo rápido.
- Schema Zod como límite de entrada.
- Contrato OpenAPI separado en `src/openapi.ts`.
- Demo estática para explicar la API sin servidor.
