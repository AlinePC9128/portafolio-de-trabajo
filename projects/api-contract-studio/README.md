# API Contract Studio

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
