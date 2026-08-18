import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lead, LeadStage } from './models';
import { LeadService } from './lead.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly leadsApi = inject(LeadService);
  private readonly fb = inject(FormBuilder);
  readonly leads = signal<Lead[]>([]);
  readonly query = signal('');
  readonly stage = signal<LeadStage | 'all'>('all');
  readonly loading = signal(true);
  readonly filteredLeads = computed(() => this.leads().filter((lead) => {
    const matchesQuery = `${lead.name} ${lead.company}`.toLowerCase().includes(this.query().toLowerCase());
    return matchesQuery && (this.stage() === 'all' || lead.stage === this.stage());
  }));
  readonly totalValue = computed(() => this.leads().reduce((total, lead) => total + lead.value, 0));
  readonly leadForm = this.fb.nonNullable.group({ name: ['', Validators.required], company: ['', Validators.required], source: ['Website', Validators.required] });

  constructor() { this.refresh(); }
  refresh() { this.loading.set(true); this.leadsApi.getLeads().subscribe((items) => { this.leads.set(items); this.loading.set(false); }); }
  setQuery(value: string) { this.query.set(value); }
  setStage(value: LeadStage | 'all') { this.stage.set(value); }
  addLead() { if (this.leadForm.invalid) return; const value = this.leadForm.getRawValue(); this.leads.update((items) => [{ id: Date.now(), name: value.name, company: value.company, source: value.source, value: 0, stage: 'new', updatedAt: 'Ahora' }, ...items]); this.leadForm.reset({ name: '', company: '', source: 'Website' }); }
}
