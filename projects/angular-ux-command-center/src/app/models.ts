export type LeadStage = 'new' | 'qualified' | 'proposal' | 'won';

export interface Lead {
  id: number;
  name: string;
  company: string;
  source: string;
  value: number;
  stage: LeadStage;
  updatedAt: string;
}
