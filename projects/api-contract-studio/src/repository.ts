import type { LeadInput } from './schemas/lead.js';

export type Lead = LeadInput & { id: string; createdAt: string; status: 'new' | 'qualified' };
const leads: Lead[] = [];

export const leadRepository = {
  list: (options: { page?: number; limit?: number; status?: Lead['status'] } = {}) => {
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.min(50, Math.max(1, options.limit ?? 20));
    const filtered = options.status ? leads.filter((lead) => lead.status === options.status) : leads;
    const start = (page - 1) * limit;
    return { data: filtered.slice(start, start + limit), total: filtered.length, page, limit, hasNext: start + limit < filtered.length };
  },
  findByIdempotencyKey: (key: string) => leads.find((lead) => lead.id === key),
  create: (input: LeadInput, idempotencyKey?: string): Lead => { const lead: Lead = { ...input, id: idempotencyKey ?? crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'new' }; leads.unshift(lead); return lead; }
};
