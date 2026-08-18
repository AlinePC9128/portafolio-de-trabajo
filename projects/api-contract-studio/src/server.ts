import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import { leadRepository } from './repository.js';
import { leadSchema } from './schemas/lead.js';
import { openapi } from './openapi.js';

export const app = express();
app.use(cors()); app.use(express.json()); app.use(pinoHttp());
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'api-contract-studio' }));
app.get('/api/leads', (req, res) => { const page = Number(req.query.page ?? 1); const limit = Number(req.query.limit ?? 20); const status = typeof req.query.status === 'string' ? req.query.status as 'new' | 'qualified' : undefined; return res.json(leadRepository.list({ page, limit, status })); });
app.post('/api/leads', (req, res) => { const parsed = leadSchema.safeParse(req.body); if (!parsed.success) return res.status(422).json({ error: 'VALIDATION_ERROR', details: parsed.error.flatten() }); const idempotencyKey = typeof req.headers['idempotency-key'] === 'string' ? req.headers['idempotency-key'] : undefined; const replay = idempotencyKey ? leadRepository.findByIdempotencyKey(idempotencyKey) : undefined; if (replay) return res.status(409).json({ error: 'DUPLICATE_LEAD', data: replay }); return res.status(201).json({ data: leadRepository.create(parsed.data, idempotencyKey) }); });
app.get('/openapi.json', (_req, res) => res.json(openapi));
app.get('/docs', (_req, res) => res.type('html').send('<!doctype html><title>API Contract Studio docs</title><h1>OpenAPI docs</h1><p>Contrato disponible en <a href="/openapi.json">/openapi.json</a>.</p>'));

if (process.env.NODE_ENV !== 'test') app.listen(Number(process.env.PORT ?? 3000), () => console.log('API Contract Studio on :3000'));
