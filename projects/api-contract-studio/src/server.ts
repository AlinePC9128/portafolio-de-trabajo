import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import { leadRepository } from './repository.js';
import { leadSchema } from './schemas/lead.js';

export const app = express();
app.use(cors()); app.use(express.json()); app.use(pinoHttp());
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'api-contract-studio' }));
app.get('/api/leads', (_req, res) => res.json({ data: leadRepository.list(), total: leadRepository.list().length }));
app.post('/api/leads', (req, res) => { const parsed = leadSchema.safeParse(req.body); if (!parsed.success) return res.status(422).json({ error: 'VALIDATION_ERROR', details: parsed.error.flatten() }); return res.status(201).json({ data: leadRepository.create(parsed.data) }); });
app.get('/docs', (_req, res) => res.type('html').send('<h1>OpenAPI docs</h1><p>OpenAPI contract ready for Swagger UI.</p>'));

if (process.env.NODE_ENV !== 'test') app.listen(Number(process.env.PORT ?? 3000), () => console.log('API Contract Studio on :3000'));
