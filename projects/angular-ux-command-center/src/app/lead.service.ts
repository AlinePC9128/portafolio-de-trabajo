import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Lead } from './models';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly http = inject(HttpClient);
  private readonly fallback: Lead[] = [
    { id: 1, name: 'Mariana Torres', company: 'Studio Norte', source: 'Meta Ads', value: 18500, stage: 'qualified', priority: 'high', owner: 'Mariana', nextAction: 'Enviar propuesta', tags: ['B2B', 'web'], updatedAt: 'Hoy, 09:42' },
    { id: 2, name: 'Carlos Méndez', company: 'Data House', source: 'Google', value: 32000, stage: 'proposal', priority: 'high', owner: 'Diego', nextAction: 'Agendar demo técnica', tags: ['API'], updatedAt: 'Ayer, 16:18' },
    { id: 3, name: 'Sofía Lara', company: 'Lara Arquitectura', source: 'Orgánico', value: 12000, stage: 'new', priority: 'medium', owner: 'Aline', nextAction: 'Calificar necesidad', tags: ['SEO'], updatedAt: 'Ayer, 12:05' },
    { id: 4, name: 'Diego Ramírez', company: 'Logística D3', source: 'Referido', value: 45000, stage: 'won', priority: 'high', owner: 'Mariana', nextAction: 'Preparar onboarding', tags: ['CRM'], updatedAt: '12 Ago, 11:30' }
  ];

  getLeads() { return this.http.get<Lead[]>('/api/leads').pipe(catchError(() => of(this.fallback))); }
}
