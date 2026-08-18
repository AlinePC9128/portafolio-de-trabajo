export const openapi = {
  openapi: '3.0.3',
  info: { title: 'API Contract Studio', version: '1.0.0', description: 'API-first lead capture with validation and idempotency.' },
  servers: [{ url: 'http://localhost:3000' }],
  paths: {
    '/health': { get: { summary: 'Health check', responses: { '200': { description: 'Service health' } } } },
    '/api/leads': {
      get: { summary: 'List leads', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 50 } }], responses: { '200': { description: 'Paginated leads' } } },
      post: { summary: 'Create lead', parameters: [{ name: 'Idempotency-Key', in: 'header', required: false, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LeadInput' } } } }, responses: { '201': { description: 'Created' }, '409': { description: 'Duplicate' }, '422': { description: 'Validation error' } } }
    }
  },
  components: { schemas: { LeadInput: { type: 'object', required: ['name', 'email', 'company', 'source', 'consent'], properties: { name: { type: 'string', minLength: 2 }, email: { type: 'string', format: 'email' }, company: { type: 'string' }, source: { type: 'string', enum: ['website', 'meta_ads', 'google_ads', 'referral'] }, consent: { type: 'boolean', enum: [true] } } } } }
} as const;
