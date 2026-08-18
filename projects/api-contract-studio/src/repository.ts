import type { LeadInput } from './schemas/lead.js';

export type Lead = LeadInput & { id: string; createdAt: string; status: 'new' | 'qualified' };
const leads: Lead[] = [];

export const leadRepository = {
  list: () => leads,
  create: (input: LeadInput): Lead => { const lead: Lead = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'new' }; leads.unshift(lead); return lead; }
};
