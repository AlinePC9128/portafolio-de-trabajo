const cases = {
  problem: { kicker: '01 / PROBLEM FRAMING', title: 'La persona no busca “un formulario”. Busca certeza.', text: 'Una empresa necesita convertir visitas en solicitudes calificadas sin pedir información innecesaria ni esconder el siguiente paso.', artifact: '<div class="artifact-title">INSIGHT MAP</div><div class="research"><div>Persona: responsable de operaciones</div><div>Fricción: no sabe qué solución necesita</div><div>Oportunidad: ofrecer diagnóstico guiado</div></div>' },
  flow: { kicker: '02 / USER FLOW', title: 'Reducir decisiones y aumentar confianza.', text: 'El flujo prioriza contexto: sector, problema, urgencia y datos mínimos para un contacto útil.', artifact: '<div class="artifact-title">USER FLOW</div><div class="flow"><span>Landing</span><b>→</b><span>Sector</span><b>→</b><span>Necesidad</span><b>→</b><span>Confirmación</span></div><div class="flow-note">Regla: cada pantalla debe responder “¿qué sigue?”</div>' },
  ui: { kicker: '03 / WIREFRAME → UI', title: 'La interfaz explica lo que pasará después.', text: 'Jerarquía visual, estados visibles y copy orientado a la acción: la persona sabe qué completar y qué recibirá.', artifact: '<div class="artifact-title">LOW-FI SCREEN</div><div class="wire"><i></i><i></i><i></i></div><div class="ui-states"><span>empty</span><span>focus</span><span>success</span></div>' },
  test: { kicker: '04 / VALIDATION', title: 'Medir no es el final: es la siguiente decisión.', text: 'Se valida con tareas breves: encontrar una solución, completar el diagnóstico y entender el mensaje de confirmación.', artifact: '<div class="artifact-title">USABILITY NOTES</div><div class="test-result"><div><strong>4/5</strong><small>completaron el flujo</small></div><div><strong>-32%</strong><small>campos innecesarios</small></div></div>' },
  strategy: { kicker: '05 / SERVICE SYSTEM', title: 'La experiencia continúa después del botón.', text: 'El diseño conecta frontend, CRM y seguimiento: la promesa que recibe la persona debe coincidir con la operación que la atiende.', artifact: '<div class="artifact-title">SERVICE BLUEPRINT</div><div class="blueprint"><span>Persona</span><span>Interfaz</span><span>CRM</span><span>Equipo</span><i></i><i></i><i></i></div>' }
};
const methods = {
  interviews: '<strong>Entrevistas</strong><span>5 conversaciones · 3 patrones repetidos</span><em>Insight: “No sé qué servicio elegir”.</em>',
  analytics: '<strong>Analítica</strong><span>GA4 · scroll depth · drop-off por campo</span><em>Señal: abandono al pedir teléfono.</em>',
  usability: '<strong>Usabilidad</strong><span>5 tareas moderadas · 1 prototipo</span><em>Resultado: completar diagnóstico en 2:41 min.</em>'
};
const caseEl = document.querySelector('#case');
function render(key) { const c = cases[key]; caseEl.innerHTML = `<div><span class="case-kicker">${c.kicker}</span><h2>${c.title}</h2><p>${c.text}</p></div><div class="artifact-wrap"><div class="artifact">${c.artifact}</div></div>`; }
document.querySelectorAll('[data-step]').forEach((btn) => btn.addEventListener('click', () => { document.querySelectorAll('[data-step]').forEach((item) => item.classList.toggle('active', item === btn)); render(btn.dataset.step); }));
document.querySelectorAll('[data-method]').forEach((btn) => btn.addEventListener('click', () => { document.querySelectorAll('[data-method]').forEach((item) => item.classList.toggle('active', item === btn)); document.querySelector('#method-output').innerHTML = methods[btn.dataset.method]; }));
render('problem');
document.querySelector('#method-output').innerHTML = methods.interviews;
