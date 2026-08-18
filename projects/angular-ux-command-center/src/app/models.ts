export type LeadStage = 'new' | 'qualified' | 'proposal' | 'won';

export interface Lead {
  id: number;
  name: string;
  company: string;
  source: string;
  value: number;
  stage: LeadStage;
  priority: 'low' | 'medium' | 'high';
  owner: string;
  nextAction: string;
  tags: string[];
  updatedAt: string;
}
