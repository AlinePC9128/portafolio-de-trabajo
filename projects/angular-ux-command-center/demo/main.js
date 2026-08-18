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

let leads = [...initialLeads];
let stage = 'all';
let view = 'cards';
let selected = null;
const $ = (selector) => document.querySelector(selector);
const money = (value) => `$${value.toLocaleString('es-MX')}`;

function getVisibleLeads() {
  const query = $('#search').value.toLowerCase().trim();
  const owner = $('#owner').value;
  return leads.filter((lead) => {
    const haystack = `${lead.name} ${lead.company} ${lead.source} ${lead.tags.join(' ')}`.toLowerCase();
    return (stage === 'all' || lead.stage === stage) && (owner === 'all' || lead.owner === owner) && haystack.includes(query);
  });
}

function renderMetrics() {
  $('#count').textContent = leads.length;
  $('#total').textContent = money(leads.reduce((total, lead) => total + lead.value, 0));
  $('#count-note').textContent = `${leads.filter((lead) => lead.stage === 'won').length} ganados · +18% vs. periodo anterior`;
}

function cardTemplate(lead) {
  return `<article class="card ${selected === lead.id ? 'selected' : ''}" data-id="${lead.id}">
    <div class="card-head"><span class="avatar">${lead.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}</span><span class="stage ${lead.stage}">${lead.stage}</span></div>
    <h2>${lead.name}</h2><p>${lead.company}</p><div class="tag-list">${lead.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    <div class="card-foot"><span>${lead.source}</span><b>${money(lead.value)}</b></div><small class="next-action">↳ ${lead.next}</small>
  </article>`;
}

function tableTemplate(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>Lead</th><th>Etapa</th><th>Responsable</th><th>Valor</th><th>Siguiente acción</th></tr></thead><tbody>${rows.map((lead) => `<tr data-id="${lead.id}"><td><strong>${lead.name}</strong><small>${lead.company}</small></td><td><span class="stage ${lead.stage}">${lead.stage}</span></td><td>${lead.owner}</td><td>${money(lead.value)}</td><td>${lead.next}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderDetail() {
  const detail = $('#detail');
  const lead = leads.find((item) => item.id === selected);
  if (!lead) { detail.innerHTML = '<span class="detail-kicker">Selecciona un lead</span><h2>El contexto aparece aquí.</h2><p>Haz clic en una oportunidad para ver su origen, valor, prioridad y siguiente acción.</p>'; return; }
  detail.innerHTML = `<span class="detail-kicker">LEAD #${String(lead.id).padStart(3, '0')} / ${lead.stage}</span><h2>${lead.name}</h2><p>${lead.company} · ${lead.source}</p><div class="detail-list"><div><small>Valor estimado</small><strong>${money(lead.value)}</strong></div><div><small>Prioridad</small><strong>${lead.priority}</strong></div><div><small>Responsable</small><strong>${lead.owner}</strong></div></div><div class="next-box"><small>NEXT BEST ACTION</small><strong>${lead.next}</strong><button id="clear-detail">Cerrar detalle</button></div>`;
  $('#clear-detail').addEventListener('click', () => { selected = null; render(); });
}

function render() {
  const rows = getVisibleLeads();
  $('#leads').className = view === 'table' ? 'table-view' : 'grid';
  $('#leads').innerHTML = rows.length ? (view === 'table' ? tableTemplate(rows) : rows.map(cardTemplate).join('')) : '<p class="empty">Sin coincidencias para estos filtros.</p>';
  document.querySelectorAll('[data-id]').forEach((node) => node.addEventListener('click', () => { selected = Number(node.dataset.id); render(); }));
  renderDetail(); renderMetrics();
}

$('#search').addEventListener('input', render);
$('#owner').addEventListener('change', render);
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => { stage = button.dataset.stage; document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button)); render(); }));
document.querySelectorAll('.view').forEach((button) => button.addEventListener('click', () => { view = button.dataset.view; document.querySelectorAll('.view').forEach((item) => item.classList.toggle('active', item === button)); render(); }));
$('#lead-form').addEventListener('submit', (event) => { event.preventDefault(); leads = [{ id: Date.now(), name: $('#new-name').value, company: $('#new-company').value, source: $('#new-source').value, value: 0, stage: 'new', priority: 'Media', owner: 'Aline', next: 'Calificar necesidad', tags: ['nuevo'] }, ...leads]; event.target.reset(); stage = 'all'; render(); });
render();
