const projectDetails = {
  api: {
    kicker: "01 / API LAB",
    title: "API Lead Monitor",
    description: "Una demostración de frontend orientado a datos: la interfaz consulta un endpoint, informa lo que ocurre y permite explorar el resultado sin perder contexto.",
    contribution: ["Diseño de estados loading, vacío y error", "Consumo de endpoint REST con fetch()", "Transformación de JSON a tarjetas accesibles", "Filtro de resultados en tiempo real"],
    tags: ["JavaScript", "Fetch API", "REST", "JSON", "UX de datos"],
    note: "Proyecto demostrativo para mostrar mi forma de resolver una integración frontend. La lógica está en script.js y puede conectarse a una API propia con mínimos cambios."
  },
  crm: {
    kicker: "02 / INTEGRATION",
    title: "Clientes_SAE + Webhooks",
    description: "Un flujo de automatización que conecta captación, validación y seguimiento comercial, tomando como referencia la personalización de Perfex CRM y la integración de leads.",
    contribution: ["Mapeo de nombre, teléfono, correo, ciudad y servicio", "Validación del payload recibido", "Automatización Meta Ads → Zapier → CRM", "Trazabilidad para el equipo comercial"],
    tags: ["PHP", "MySQL", "HTTP / POST", "Zapier", "Perfex CRM"],
    note: "El caso parte de experiencia real con integraciones y personalización de CRM. Los nombres y datos sensibles de clientes no se exponen en este portafolio."
  },
  autosise: {
    kicker: "03 / SHOWROOM",
    title: "AUTOSISE Showroom",
    description: "Una experiencia de producto para automatización, cámaras y control de acceso: contenido técnico traducido a decisiones simples para diferentes sectores.",
    contribution: ["Arquitectura de información por soluciones y sectores", "Estructura de catálogo y categorías WooCommerce", "Diseño responsive y CTAs de conversión", "Contenido orientado a empresas, puertos e industria"],
    tags: ["WordPress", "WooCommerce", "Elementor", "UX/UI", "Mobile-first"],
    note: "Caso basado en el proyecto AUTOSISE y en la experiencia de construir interfaces para productos tecnológicos sin perder claridad comercial."
  },
  intersyst: {
    kicker: "04 / WEBSITE",
    title: "Intersyst Seguridad",
    description: "Desarrollo y operación de un sitio para seguridad integrada, combinando contenido de servicios, generación de prospectos, SEO y soporte técnico continuo.",
    contribution: ["Creación y mantenimiento de páginas WordPress", "Landing pages y formularios conectados a canales comerciales", "Optimización de títulos, metadatos, ALT y rendimiento", "Contenido de servicios, sectores y campañas"],
    tags: ["WordPress", "Elementor Pro", "SEO", "CF7", "Analytics"],
    note: "Proyecto real desarrollado para Intersyst Seguridad y Control. El portafolio usa una representación visual para proteger información operativa y comercial."
  },
  uxflow: {
    kicker: "05 / UX CASE",
    title: "Lead Flow UX",
    description: "Un caso de estudio breve para explicar el proceso UX completo: identificar la fricción, ordenar el contenido, crear una solución y validarla con personas.",
    contribution: ["Arquitectura de información y sitemap", "User flow orientado a solicitud de diagnóstico", "Wireframes y prototipos responsive en Figma", "Pruebas de usabilidad y mejoras iterativas"],
    tags: ["Figma", "User flows", "Wireframes", "Prototyping", "Accessibility"],
    note: "Este caso demuestra el método y los entregables que puedo aportar en un equipo UX/UI, incluso cuando el producto final todavía está en definición."
  },
  marketing: {
    kicker: "06 / CAMPAIGNS",
    title: "Marketing Cockpit",
    description: "Una vista ejecutiva para conectar creatividad, adquisición y resultados, con métricas que ayudan a priorizar mejoras y comunicar avances.",
    contribution: ["Planeación de campañas y contenido digital", "Seguimiento de leads y conversiones", "Lectura de GA4, Tag Manager y Search Console", "Presentación de hallazgos en reportes y dashboards"],
    tags: ["GA4", "Tag Manager", "Search Console", "Meta Ads", "Power BI"],
    note: "Experiencia real en marketing digital: hasta cinco campañas simultáneas, generación aproximada de 200 leads mensuales y gestión de bases de datos comerciales."
  }
};

const uxDetails = {
  research: { kicker: "FASE 01 / DESCUBRIR", title: "Entender antes de construir", text: "Identifico objetivos, usuarios, contenido disponible y puntos de fricción. El resultado es una definición clara del problema.", artifact: "brief → insight → opportunity" },
  structure: { kicker: "FASE 02 / ORGANIZAR", title: "Dar forma al contenido", text: "Construyo sitemap, arquitectura de información y user flows para que cada pantalla tenga una función y cada acción tenga sentido.", artifact: "content → hierarchy → flow" },
  prototype: { kicker: "FASE 03 / PROTOTIPAR", title: "Hacer visible la idea", text: "Paso de wireframes a prototipos responsive, cuidando jerarquía visual, componentes, estados y consistencia entre desktop y móvil.", artifact: "wireframe → component → prototype" },
  validate: { kicker: "FASE 04 / VALIDAR", title: "Mejorar con evidencia", text: "Pruebo la experiencia, observo dónde se detienen las personas y convierto esos hallazgos en ajustes concretos de contenido o interfaz.", artifact: "test → insight → iteration" }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Mobile navigation
const navToggle = $(".nav-toggle");
const navMenu = $(".nav-menu");
navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
$$('.nav-menu a').forEach((link) => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

// Light/dark theme
const themeToggle = $(".theme-toggle");
const savedTheme = localStorage.getItem("aline-theme");
if (savedTheme === "dark") document.body.classList.add("dark");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("aline-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Project filters
$$('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    $$('.project-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

// Project case-study dialog
const modal = $("#project-modal");
const openProject = (projectKey) => {
  const data = projectDetails[projectKey];
  if (!data || !modal) return;
  $("#modal-kicker").textContent = data.kicker;
  $("#modal-title").textContent = data.title;
  $("#modal-description").textContent = data.description;
  $("#modal-contribution").innerHTML = data.contribution.map((item) => `<li>${item}</li>`).join('');
  $("#modal-tags").innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
  $("#modal-note").textContent = data.note;
  modal.showModal();
};
$$('.project-open').forEach((button) => button.addEventListener('click', () => {
  if (button.dataset.demo) {
    window.location.assign(button.dataset.demo);
    return;
  }
  openProject(button.dataset.project);
}));
$("#modal-close")?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

// UX process tabs
$$('.ux-step').forEach((button) => {
  button.addEventListener('click', () => {
    const data = uxDetails[button.dataset.uxStep];
    if (!data) return;
    $$('.ux-step').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    const detail = $('#ux-detail');
    detail.innerHTML = `<span class="detail-kicker">${data.kicker}</span><h3>${data.title}</h3><p>${data.text}</p><div class="ux-artifact"><span class="artifact-dot"></span><span class="artifact-dot"></span><span class="artifact-dot"></span><div class="artifact-lines"><i></i><i></i><i></i></div><strong>${data.artifact}</strong></div>`;
  });
});

// API Lab — real request with a resilient local fallback for offline previews
const apiResults = $('#api-results');
const apiStatus = $('#api-status');
const apiSearch = $('#api-search');
const loadApiButton = $('#load-api');
let apiUsers = [];
const fallbackUsers = [
  { id: 1, name: 'Aline Demo', username: 'aline.dev', email: 'aline@example.com', company: { name: 'Portfolio Lab' } },
  { id: 2, name: 'Mariana Torres', username: 'mariana.ux', email: 'mariana@example.com', company: { name: 'Studio Norte' } },
  { id: 3, name: 'Carlos Méndez', username: 'carlos.crm', email: 'carlos@example.com', company: { name: 'Data House' } }
];
const initials = (name) => name.split(' ').slice(0, 2).map((word) => word[0]).join('').toUpperCase();
const renderUsers = (users) => {
  if (!users.length) {
    apiResults.innerHTML = '<div class="empty-state"><span>⌕</span><strong>No hay coincidencias</strong><p>Prueba con otro nombre, usuario o compañía.</p></div>';
    return;
  }
  apiResults.innerHTML = `<div class="result-grid">${users.map((user) => `<article class="result-item"><span class="result-avatar">${initials(user.name)}</span><strong>${user.name}</strong><small>@${user.username}</small><small>${user.email}</small><div class="result-company">${user.company?.name || 'Sin compañía'}</div></article>`).join('')}</div>`;
};
const updateApiStatus = (message, state = '') => {
  apiStatus.innerHTML = `<span class="status-dot"></span> ${message}`;
  apiStatus.dataset.state = state;
};
const runApiRequest = async () => {
  loadApiButton.disabled = true;
  loadApiButton.innerHTML = 'Consultando… <span aria-hidden="true">⌛</span>';
  updateApiStatus('Consultando endpoint…');
  apiResults.innerHTML = '<div class="empty-state"><span>↻</span><strong>Cargando datos</strong><p>Procesando la respuesta de la API.</p></div>';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    apiUsers = await response.json();
    updateApiStatus(`${apiUsers.length} registros recibidos`, 'success');
  } catch (error) {
    apiUsers = fallbackUsers;
    updateApiStatus('Modo demo local · API no disponible', 'fallback');
  } finally {
    loadApiButton.disabled = false;
    loadApiButton.innerHTML = 'Actualizar datos <span aria-hidden="true">↗</span>';
    renderUsers(apiUsers);
  }
};
loadApiButton?.addEventListener('click', runApiRequest);
apiSearch?.addEventListener('input', () => {
  const query = apiSearch.value.toLowerCase().trim();
  renderUsers(apiUsers.filter((user) => `${user.name} ${user.username} ${user.email} ${user.company?.name || ''}`.toLowerCase().includes(query)));
});

// Contact form demo
$('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const feedback = $('#form-feedback');
  feedback.textContent = '¡Gracias! Este formulario es una demo; podemos conectarlo a Formspree, WordPress o tu CRM.';
  event.currentTarget.reset();
});

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } }), { threshold: .1 });
$$('.reveal').forEach((element) => revealObserver.observe(element));

$('#year').textContent = new Date().getFullYear();
