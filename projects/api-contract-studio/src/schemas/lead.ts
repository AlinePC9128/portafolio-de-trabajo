import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email(),
  company: z.string().trim().min(2).max(120),
  source: z.enum(['website', 'meta_ads', 'google_ads', 'referral']),
  consent: z.literal(true)
});

export type LeadInput = z.infer<typeof leadSchema>;
