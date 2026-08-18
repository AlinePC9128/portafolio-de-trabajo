import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/server.js';

describe('POST /api/leads', () => {
  it('rejects payloads without consent', async () => { const response = await request(app).post('/api/leads').send({ name: 'Aline', email: 'aline@example.com', company: 'Demo', source: 'website', consent: false }); expect(response.status).toBe(422); expect(response.body.error).toBe('VALIDATION_ERROR'); });
  it('creates a valid lead', async () => { const response = await request(app).post('/api/leads').send({ name: 'Aline Peña', email: 'aline@example.com', company: 'Portfolio Lab', source: 'website', consent: true }); expect(response.status).toBe(201); expect(response.body.data.status).toBe('new'); });
});
