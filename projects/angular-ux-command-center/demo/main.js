const initialLeads = [
  { id: 1, name: 'Mariana Torres', company: 'Studio Norte', source: 'Meta Ads', value: 18500, stage: 'qualified', priority: 'Alta', owner: 'Mariana', next: 'Enviar propuesta de diagnóstico', tags: ['B2B', 'web'] },
  { id: 2, name: 'Carlos Méndez', company: 'Data House', source: 'Google Ads', value: 32000, stage: 'proposal', priority: 'Alta', owner: 'Diego', next: 'Agendar demo técnica', tags: ['API', 'integración'] },
  { id: 3, name: 'Sofía Lara', company: 'Lara Arquitectura', source: 'Orgánico', value: 12000, stage: 'new', priority: 'Media', owner: 'Aline', next: 'Calificar necesidad', tags: ['SEO'] },
  { id: 4, name: 'Diego Ramírez', company: 'Logística D3', source: 'Referido', value: 45000, stage: 'won', priority: 'Alta', owner: 'Mariana', next: 'Preparar onboarding', tags: ['CRM', 'operaciones'] },
  { id: 5, name: 'Lucía Herrera', company: 'Verde Circular', source: 'Evento', value: 21000, stage: 'qualified', priority: 'Media', owner: 'Aline', next: 'Compartir caso de éxito', tags: ['sostenibilidad'] },
  { id: 6, name: 'Tomás Vidal', company: 'Nube Clara', source: 'Referido', value: 28000, stage: 'proposal', priority: 'Alta', owner: 'Diego', next: 'Resolver objeción de presupuesto', tags: ['SaaS'] },
  { id: 7, name: 'Paola Núñez', company: 'Casa Nodo', source: 'Website', value: 9000, stage: 'new', priority: 'Baja', owner: 'Aline', next: 'Enviar preguntas de discovery', tags: ['UX'] },
  { id: 8, name: 'Ángel Soto', company: 'Comercio MX', source: 'Google Ads', value: 19000, stage: 'won', priority: 'Media', owner: 'Mariana', next: 'Solicitar testimonio', tags: ['ecommerce'] }
];

const $ = (selector) => document.querySelector(selector);
const money = (value) => `$${Number(value || 0).toLocaleString('es-MX')}`;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
const storageKey = 'angular-ux-command-center-leads';
let leads = (() => { try { return JSON.parse(localStorage.getItem(storageKey)) || [...initialLeads]; } catch { return [...initialLeads]; } })();
let stage = 'all'; let view = 'cards'; let selected = null;
const persist = () => localStorage.setItem(storageKey, JSON.stringify(leads));

function setupTheme() {
  const button = $('#theme-toggle');
  const apply = (theme) => { document.body.dataset.theme = theme; button.querySelector('.theme-label').textContent = theme === 'dark' ? 'Claro' : 'Oscuro'; button.setAttribute('aria-pressed', String(theme === 'dark')); };
  apply(localStorage.getItem('portfolio-demo-theme') || 'light');
  button.addEventListener('click', () => { const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('portfolio-demo-theme', next); apply(next); });
}
function notify(message) { const node = document.createElement('div'); node.className = 'toast'; node.textContent = message; document.body.appendChild(node); setTimeout(() => node.remove(), 1800); }
function download(filename, content, type = 'text/plain') { const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([content], { type })); link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 0); }
function getVisibleLeads() {
  const query = $('#search').value.toLowerCase().trim(); const owner = $('#owner').value; const priority = $('#priority').value;
  return leads.filter((lead) => { const haystack = `${lead.name} ${lead.company} ${lead.source} ${lead.tags.join(' ')}`.toLowerCase(); return (stage === 'all' || lead.stage === stage) && (owner === 'all' || lead.owner === owner) && (priority === 'all' || lead.priority === priority) && haystack.includes(query); });
}
function renderMetrics() {
  const won = leads.filter((lead) => lead.stage === 'won').length;
  $('#count').textContent = leads.length; $('#total').textContent = money(leads.reduce((total, lead) => total + Number(lead.value || 0), 0)); $('#count-note').textContent = `${won} ganados · +18% vs. periodo anterior`;
  $('#conversion').textContent = leads.length ? `${((won / leads.length) * 100).toFixed(1)}%` : '0%'; $('#response-time').textContent = leads.length > 10 ? '3.1h' : '2.4h';
  document.querySelectorAll('.filter').forEach((button) => { const count = button.dataset.stage === 'all' ? leads.length : leads.filter((lead) => lead.stage === button.dataset.stage).length; const span = button.querySelector('span'); if (span) span.textContent = count; });
}
function cardTemplate(lead) { return `<article class="card ${selected === lead.id ? 'selected' : ''}" data-id="${lead.id}"><div class="card-head"><span class="avatar">${escapeHtml(lead.name.split(' ').map((word) => word[0]).slice(0, 2).join(''))}</span><span class="stage ${escapeHtml(lead.stage)}">${escapeHtml(lead.stage)}</span></div><h2>${escapeHtml(lead.name)}</h2><p>${escapeHtml(lead.company)}</p><div class="tag-list">${lead.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div><div class="card-foot"><span>${escapeHtml(lead.source)}</span><b>${money(lead.value)}</b></div><small class="next-action">↳ ${escapeHtml(lead.next)}</small></article>`; }
function tableTemplate(rows) { return `<div class="table-wrap"><table><thead><tr><th>Lead</th><th>Etapa</th><th>Responsable</th><th>Valor</th><th>Siguiente acción</th></tr></thead><tbody>${rows.map((lead) => `<tr data-id="${lead.id}"><td><strong>${escapeHtml(lead.name)}</strong><small>${escapeHtml(lead.company)}</small></td><td><span class="stage ${escapeHtml(lead.stage)}">${escapeHtml(lead.stage)}</span></td><td>${escapeHtml(lead.owner)}</td><td>${money(lead.value)}</td><td>${escapeHtml(lead.next)}</td></tr>`).join('')}</tbody></table></div>`; }
function renderDetail() {
  const detail = $('#detail'); const lead = leads.find((item) => item.id === selected);
  if (!lead) { detail.innerHTML = '<span class="detail-kicker">Selecciona un lead</span><h2>El contexto aparece aquí.</h2><p>Haz clic en una oportunidad para ver su origen, valor, prioridad y siguiente acción.</p>'; return; }
  const stages = ['new', 'qualified', 'proposal', 'won'];
  detail.innerHTML = `<span class="detail-kicker">LEAD #${String(lead.id).padStart(3, '0')} / ${escapeHtml(lead.stage)}</span><h2>${escapeHtml(lead.name)}</h2><p>${escapeHtml(lead.company)} · ${escapeHtml(lead.source)}</p><div class="detail-list"><div><small>Valor estimado</small><strong>${money(lead.value)}</strong></div><div><small>Prioridad</small><strong>${escapeHtml(lead.priority)}</strong></div><div><small>Responsable</small><strong>${escapeHtml(lead.owner)}</strong></div></div><div class="next-box"><small>NEXT BEST ACTION</small><strong>${escapeHtml(lead.next)}</strong><label class="detail-edit">Actualizar etapa<select id="detail-stage">${stages.map((item) => `<option ${item === lead.stage ? 'selected' : ''}>${item}</option>`).join('')}</select></label><div class="detail-actions"><button id="save-stage" type="button">Guardar etapa</button><button id="clear-detail" type="button">Cerrar</button></div></div>`;
  $('#save-stage').addEventListener('click', () => { lead.stage = $('#detail-stage').value; persist(); render(); notify('Etapa actualizada'); });
  $('#clear-detail').addEventListener('click', () => { selected = null; render(); });
}
function render() { const rows = getVisibleLeads(); $('#leads').className = view === 'table' ? 'table-view' : 'grid'; $('#leads').innerHTML = rows.length ? (view === 'table' ? tableTemplate(rows) : rows.map(cardTemplate).join('')) : '<p class="empty">Sin coincidencias para estos filtros.</p>'; document.querySelectorAll('[data-id]').forEach((node) => node.addEventListener('click', () => { selected = Number(node.dataset.id); render(); })); renderDetail(); renderMetrics(); }
function exportVisible() { const rows = getVisibleLeads(); const header = 'nombre,empresa,fuente,valor,etapa,prioridad,responsable,siguiente_accion'; const csv = [header, ...rows.map((lead) => [lead.name, lead.company, lead.source, lead.value, lead.stage, lead.priority, lead.owner, lead.next].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))].join('\n'); download('angular-leads.csv', `\ufeff${csv}`, 'text/csv'); notify(`${rows.length} leads exportados`); }
setupTheme();
$('#search').addEventListener('input', render); $('#owner').addEventListener('change', render); $('#priority').addEventListener('change', render);
$('#clear-filters').addEventListener('click', () => { $('#search').value = ''; $('#owner').value = 'all'; $('#priority').value = 'all'; stage = 'all'; document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item.dataset.stage === 'all')); render(); notify('Filtros limpiados'); });
$('#export-leads').addEventListener('click', exportVisible);
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => { stage = button.dataset.stage; document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button)); render(); }));
document.querySelectorAll('.view').forEach((button) => button.addEventListener('click', () => { view = button.dataset.view; document.querySelectorAll('.view').forEach((item) => item.classList.toggle('active', item === button)); render(); }));
$('#lead-form').addEventListener('submit', (event) => { event.preventDefault(); leads = [{ id: Date.now(), name: $('#new-name').value.trim(), company: $('#new-company').value.trim(), source: $('#new-source').value, value: Number($('#new-value').value || 0), stage: 'new', priority: 'Media', owner: $('#new-owner').value, next: 'Calificar necesidad', tags: ['nuevo'] }, ...leads]; persist(); event.target.reset(); stage = 'all'; render(); notify('Lead guardado localmente'); });
render();
