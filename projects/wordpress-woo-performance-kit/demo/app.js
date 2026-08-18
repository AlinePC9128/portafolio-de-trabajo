const panels = {
  overview: '<small>ARCHITECTURE</small><h3>Un plugin pequeño, varias responsabilidades separadas.</h3><p>REST health check, SEO filters, WooCommerce hooks y una capa visual de monitoreo pueden evolucionar sin mezclar lógica.</p><div class="checks"><span>✓ Endpoint /wp-json/aline/v1/health</span><span>✓ Theme color + title parts</span><span>✓ Product loop badge</span></div>',
  seo: '<small>SEO / CONTENT SYSTEM</small><h3>El contenido también es una interfaz.</h3><p>El caso combina title parts, semántica, metadata básica, estructura de producto y checklist editorial para mejorar descubrimiento.</p><div class="checks"><span>✓ Title template</span><span>✓ Meta description reviewed</span><span>✓ Schema-ready product data</span></div>',
  woo: '<small>WOOCOMMERCE / CONVERSION</small><h3>Catálogo pensado para la siguiente acción.</h3><p>Hooks de loop, estados de stock y datos visibles reducen preguntas antes de pedir contacto o compra.</p><div class="checks"><span>✓ Stock badge</span><span>✓ Price clarity</span><span>✓ CTA por disponibilidad</span></div>',
  ops: '<small>MAINTENANCE / OBSERVABILITY</small><h3>Un CMS útil también se puede operar.</h3><p>Health endpoint, versión del plugin, cache strategy y checklist de staging hacen más fácil detectar problemas antes del usuario.</p><div class="checks"><span>✓ REST health</span><span>✓ Staging checklist</span><span>✓ Backup + rollback</span></div>'
};
const panel = document.querySelector('#panel');
function render(key) { panel.innerHTML = panels[key]; document.querySelectorAll('[data-panel]').forEach((button) => button.classList.toggle('active', button.dataset.panel === key)); }
document.querySelectorAll('[data-panel]').forEach((button) => button.addEventListener('click', () => render(button.dataset.panel)));
document.querySelector('#catalog').addEventListener('click', () => document.querySelector('#catalog-grid').scrollIntoView({ behavior: 'smooth' }));
render('overview');
